'use client';

import React, { useRef, useEffect, useState } from 'react';

interface PixelBoatProps {
  x: number;           // Position 0-100
  velocity: number;
  isDragging: boolean;
  isSailing: boolean;
  facingRight?: boolean;
}

interface WakeParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

// Pixel unit size (matches island rect sizes)
const PX = 4;

// Colors — matching island palette
const HULL = '#5d4037';
const HULL_LIGHT = '#8d6e63';
const HULL_DARK = '#3e2723';
const DECK = '#a1887f';
const MAST = '#795548';
const SAIL_COLOR = '#f4f4f4';
const SAIL_SHADOW = '#94b0c2';
const CABIN_ROOF = '#b13e53';
const CABIN_ROOF_TIP = '#ef7d57';
const FLAG_BG = '#1a1c2c';
const FLAG_DETAIL = '#f4f4f4';
const GOLD = '#ffd700';
const PORTHOLE = '#29366f';

// Hull rows: [y, x, width, color]
const hullData: [number, number, number, string][] = [
  [96,  28, 156, DECK],        // deck surface
  [100, 28, 156, HULL_LIGHT],  // upper hull
  [104, 24, 156, HULL],        // hull
  [108, 20, 160, HULL_LIGHT],  // plank highlight
  [112, 20, 152, HULL],        // hull body
  [116, 24, 140, HULL],        // lower hull
  [120, 28, 124, HULL_DARK],   // bottom hull
  [124, 40, 100, HULL_DARK],   // keel upper
  [128, 56,  72, HULL_DARK],   // keel bottom
];

// Sail triangle: each row 4px wider, from mast rightward
const sailData = Array.from({ length: 16 }, (_, i) => ({
  y: 20 + i * PX,
  x: 116,
  w: PX + i * PX,
}));

export function PixelBoat({ x, velocity, isDragging, isSailing, facingRight = true }: PixelBoatProps) {
  const direction = velocity !== 0 ? velocity > 0 : facingRight;
  const [wakeParticles, setWakeParticles] = useState<WakeParticle[]>([]);
  const nextId = useRef(0);

  // Wake trail effect — spawn particles when moving
  useEffect(() => {
    const isMoving = Math.abs(velocity) > 0.3;
    if (!isMoving) return;

    const interval = setInterval(() => {
      setWakeParticles((prev) => {
        const newParticle: WakeParticle = {
          id: nextId.current++,
          x: direction ? -16 : 200,
          y: 100 + Math.random() * 20,
          opacity: 0.8,
          size: 4 + Math.random() * 3,
        };
        const aged = prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.1,
            x: p.x + (direction ? -3 : 3),
          }))
          .filter((p) => p.opacity > 0);
        return [...aged, newParticle].slice(-12);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [velocity, direction]);

  // Clear particles when stopped
  useEffect(() => {
    if (Math.abs(velocity) <= 0.3) {
      const timeout = setTimeout(() => setWakeParticles([]), 600);
      return () => clearTimeout(timeout);
    }
  }, [velocity]);

  const svgProps = {
    width: 200,
    height: 140,
    viewBox: '0 0 200 140',
    className: 'pixel-art',
    shapeRendering: 'crispEdges' as const,
  };

  return (
    <div
      data-boat
      className={`absolute cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
      style={{
        left: `${x}%`,
        bottom: '18%',
        transform: `translateX(-50%) ${direction ? '' : 'scaleX(-1)'}`,
        zIndex: 50,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      {/* Wake trail particles */}
      {wakeParticles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.opacity > 0.5 ? '#f4f4f4' : '#73eff7',
            opacity: p.opacity,
            transition: 'opacity 0.1s',
          }}
        />
      ))}

      {/* Boat container with bobbing animation */}
      <div
        className={isSailing || isDragging ? '' : 'animate-boat-bob'}
        style={{ position: 'relative', width: 200, height: 140 }}
      >
        {/* Main boat SVG: hull, cabin, mast, crow's nest */}
        <svg {...svgProps}>
          {/* Hull */}
          {hullData.map(([y, hx, w, color], i) => (
            <rect key={`h${i}`} x={hx} y={y} width={w} height={PX} fill={color} />
          ))}

          {/* Portholes */}
          <rect x={56} y={108} width={8} height={8} fill={PORTHOLE} />
          <rect x={96} y={108} width={8} height={8} fill={PORTHOLE} />

          {/* Bowsprit */}
          <rect x={176} y={92} width={20} height={PX} fill={HULL_LIGHT} />
          <rect x={192} y={88} width={8} height={8} fill={GOLD} />

          {/* Stern post */}
          <rect x={28} y={88} width={PX} height={12} fill={HULL} />

          {/* Cabin walls */}
          <rect x={48} y={72} width={48} height={24} fill={HULL_LIGHT} />
          <rect x={48} y={72} width={48} height={PX} fill={DECK} />
          {/* Cabin roof */}
          <rect x={44} y={64} width={56} height={8} fill={CABIN_ROOF} />
          <rect x={48} y={60} width={48} height={PX} fill={CABIN_ROOF} />
          <rect x={52} y={56} width={40} height={PX} fill={CABIN_ROOF_TIP} />
          {/* Cabin window & door */}
          <rect x={60} y={80} width={8} height={8} fill={PORTHOLE} />
          <rect x={80} y={80} width={8} height={16} fill={HULL} />

          {/* Mast pole (above crow's nest) */}
          <rect x={110} y={0} width={PX} height={20} fill={MAST} />
          {/* Main mast */}
          <rect x={108} y={20} width={8} height={76} fill={MAST} />
          <rect x={108} y={20} width={PX} height={76} fill={HULL_LIGHT} />

          {/* Crow's nest */}
          <rect x={100} y={16} width={24} height={PX} fill={HULL} />
          <rect x={100} y={12} width={PX} height={8} fill={HULL} />
          <rect x={120} y={12} width={PX} height={8} fill={HULL} />
        </svg>

        {/* Sail with flutter animation */}
        <div
          className="animate-sail-flutter"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: '112px 52px',
            pointerEvents: 'none',
          }}
        >
          <svg {...svgProps}>
            {sailData.map((row, i) => (
              <React.Fragment key={`s${i}`}>
                <rect
                  x={row.x}
                  y={row.y}
                  width={row.w}
                  height={PX}
                  fill={i >= 13 ? SAIL_SHADOW : SAIL_COLOR}
                />
                {i >= 2 && i < 13 && (
                  <rect
                    x={row.x + row.w - PX}
                    y={row.y}
                    width={PX}
                    height={PX}
                    fill={SAIL_SHADOW}
                  />
                )}
              </React.Fragment>
            ))}
            {/* Boom */}
            <rect x={112} y={84} width={68} height={PX} fill={MAST} />
          </svg>
        </div>

        {/* Flag with wave animation */}
        <div
          className="animate-flag-wave"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: '116px 6px',
            pointerEvents: 'none',
          }}
        >
          <svg {...svgProps}>
            <rect x={116} y={0} width={24} height={PX} fill={FLAG_BG} />
            <rect x={116} y={PX} width={24} height={PX} fill={FLAG_BG} />
            <rect x={116} y={2 * PX} width={24} height={PX} fill={FLAG_BG} />
            {/* Skull */}
            <rect x={124} y={0} width={8} height={PX} fill={FLAG_DETAIL} />
            {/* Crossbones */}
            <rect x={120} y={PX} width={PX} height={PX} fill={FLAG_DETAIL} />
            <rect x={132} y={PX} width={PX} height={PX} fill={FLAG_DETAIL} />
          </svg>
        </div>

        {/* Water splash effect when moving */}
        {(isSailing || Math.abs(velocity) > 0.5) && (
          <>
            <div
              className="absolute animate-wave-fast"
              style={{
                left: direction ? '-12px' : 'auto',
                right: direction ? 'auto' : '-12px',
                bottom: '8px',
                width: '12px',
                height: '6px',
                backgroundColor: '#73eff7',
                opacity: Math.min(1, Math.abs(velocity) / 2),
              }}
            />
            <div
              className="absolute animate-wave-medium"
              style={{
                left: direction ? '-6px' : 'auto',
                right: direction ? 'auto' : '-6px',
                bottom: '16px',
                width: '8px',
                height: '6px',
                backgroundColor: '#f4f4f4',
                opacity: Math.min(0.8, Math.abs(velocity) / 2),
              }}
            />
          </>
        )}
      </div>

      {/* Reflection in water */}
      <div
        className="absolute opacity-20"
        style={{
          top: '132px',
          left: 0,
          transform: 'scaleY(-0.3)',
          transformOrigin: 'top',
          filter: 'blur(2px)',
        }}
      >
        <svg
          width={200}
          height={36}
          viewBox="0 96 200 36"
          className="pixel-art"
          shapeRendering="crispEdges"
        >
          {hullData.map(([y, hx, w, color], i) => (
            <rect key={`r${i}`} x={hx} y={y} width={w} height={PX} fill={color} />
          ))}
        </svg>
      </div>
    </div>
  );
}
