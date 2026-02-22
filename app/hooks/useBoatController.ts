import { useState, useEffect, useCallback, useRef } from 'react';

interface BoatState {
  boatX: number;          // Position 0-100 (percentage of voyage)
  velocity: number;       // Current velocity for momentum
  isDragging: boolean;    // Is user dragging the boat
  targetX: number | null; // Target position when clicking
  isSailing: boolean;     // Is boat actively moving
}

interface UseBoatControllerOptions {
  initialPosition?: number;
  friction?: number;       // How quickly velocity decays (0-1)
  acceleration?: number;   // Speed when sailing to target
  maxVelocity?: number;    // Maximum velocity cap
  snapDistance?: number;   // Distance to snap to islands
}

interface UseBoatControllerReturn {
  boatX: number;
  velocity: number;
  isDragging: boolean;
  isSailing: boolean;
  nearestIsland: string | null;
  sailTo: (x: number) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  setBoatPosition: (x: number) => void;
}

const DEFAULT_OPTIONS: Required<UseBoatControllerOptions> = {
  initialPosition: 5,
  friction: 0.97,
  acceleration: 0.08,
  maxVelocity: 0.8,
  snapDistance: 8,
};

export function useBoatController(
  islands: { id: string; position: number }[],
  options: UseBoatControllerOptions = {}
): UseBoatControllerReturn {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const [state, setState] = useState<BoatState>({
    boatX: opts.initialPosition,
    velocity: 0,
    isDragging: false,
    targetX: null,
    isSailing: false,
  });

  const dragStartX = useRef<number>(0);
  const dragStartBoatX = useRef<number>(0);
  const animationFrame = useRef<number | null>(null);
  const lastTime = useRef<number>(Date.now());

  // Find nearest island within snap distance
  const nearestIsland = islands.find(
    island => Math.abs(island.position - state.boatX) < opts.snapDistance
  )?.id ?? null;

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      const delta = Math.min((now - lastTime.current) / 16, 3); // Cap delta to prevent jumps
      lastTime.current = now;

      setState(prev => {
        let { boatX, velocity, targetX, isSailing } = prev;
        const { isDragging } = prev;

        // Don't update position while dragging
        if (isDragging) {
          return prev;
        }

        // Sail toward target if set
        if (targetX !== null) {
          const diff = targetX - boatX;
          const direction = Math.sign(diff);

          // Accelerate toward target
          velocity += direction * opts.acceleration * delta;

          // Cap velocity
          velocity = Math.max(-opts.maxVelocity, Math.min(opts.maxVelocity, velocity));

          // Check if we're close enough to target
          if (Math.abs(diff) < 0.5) {
            boatX = targetX;
            velocity = 0;
            targetX = null;
            isSailing = false;
          }
        }

        // Apply velocity
        boatX += velocity * delta;

        // Apply friction when no target
        if (targetX === null) {
          velocity *= opts.friction;

          // Stop if velocity is very small
          if (Math.abs(velocity) < 0.01) {
            velocity = 0;
            isSailing = false;
          }
        }

        // Clamp position
        boatX = Math.max(0, Math.min(100, boatX));

        // Check if anything changed
        if (
          boatX === prev.boatX &&
          velocity === prev.velocity &&
          targetX === prev.targetX &&
          isSailing === prev.isSailing
        ) {
          return prev;
        }

        return { ...prev, boatX, velocity, targetX, isSailing };
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [opts.acceleration, opts.friction, opts.maxVelocity]);

  // Sail to a specific position
  const sailTo = useCallback((x: number) => {
    setState(prev => ({
      ...prev,
      targetX: Math.max(0, Math.min(100, x)),
      isSailing: true,
    }));
  }, []);

  // Set boat position directly (for clicking on map)
  const setBoatPosition = useCallback((x: number) => {
    sailTo(x);
  }, [sailTo]);

  // Mouse drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drag if clicking on the boat itself
    const target = e.target as HTMLElement;
    if (!target.closest('[data-boat]')) {
      // Clicked on ocean - sail to that position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      sailTo(clickX);
      return;
    }

    e.preventDefault();
    dragStartX.current = e.clientX;
    dragStartBoatX.current = state.boatX;

    setState(prev => ({ ...prev, isDragging: true, targetX: null, velocity: 0 }));

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartX.current;
      const containerWidth = window.innerWidth;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newX = Math.max(0, Math.min(100, dragStartBoatX.current + deltaPercent));

      setState(prev => ({
        ...prev,
        boatX: newX,
        velocity: deltaPercent * 0.1, // Build up velocity while dragging
      }));
    };

    const handleMouseUp = () => {
      setState(prev => ({ ...prev, isDragging: false, isSailing: true }));
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [state.boatX, sailTo]);

  // Touch handling for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.target as HTMLElement;

    if (!target.closest('[data-boat]')) {
      // Touched on ocean - sail to that position
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const touchX = ((touch.clientX - rect.left) / rect.width) * 100;
      sailTo(touchX);
      return;
    }

    dragStartX.current = touch.clientX;
    dragStartBoatX.current = state.boatX;

    setState(prev => ({ ...prev, isDragging: true, targetX: null, velocity: 0 }));

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - dragStartX.current;
      const containerWidth = window.innerWidth;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const newX = Math.max(0, Math.min(100, dragStartBoatX.current + deltaPercent));

      setState(prev => ({
        ...prev,
        boatX: newX,
        velocity: deltaPercent * 0.1,
      }));
    };

    const handleTouchEnd = () => {
      setState(prev => ({ ...prev, isDragging: false, isSailing: true }));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  }, [state.boatX, sailTo]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setState(prev => ({
          ...prev,
          velocity: prev.velocity - 0.5,
          isSailing: true,
          targetX: null,
        }));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setState(prev => ({
          ...prev,
          velocity: prev.velocity + 0.5,
          isSailing: true,
          targetX: null,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    boatX: state.boatX,
    velocity: state.velocity,
    isDragging: state.isDragging,
    isSailing: state.isSailing,
    nearestIsland,
    sailTo,
    handleMouseDown,
    handleTouchStart,
    setBoatPosition,
  };
}
