'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface OceanBackgroundProps {
  boatX: number;
}

interface CloudData {
  left: number;
  top: number;
  size: number;
}

interface SparkleData {
  left: number;
  top: number;
  delay: number;
}

interface StarData {
  left: number;
  top: number;
  size: number;
  delay: number;
}

// Interpolate between two hex colors
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.replace('#', ''), 16);
  const bh = parseInt(b.replace('#', ''), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${((rr << 16) | (rg << 8) | rb).toString(16).padStart(6, '0')}`;
}

export function OceanBackground({ boatX }: OceanBackgroundProps) {
  const [farClouds, setFarClouds] = useState<CloudData[]>([]);
  const [nearClouds, setNearClouds] = useState<CloudData[]>([]);
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);
  const [stars, setStars] = useState<StarData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFarClouds(
      Array.from({ length: 8 }, (_, i) => ({
        left: i * 25 + Math.random() * 10,
        top: Math.random() * 60,
        size: 20 + Math.random() * 20,
      }))
    );

    setNearClouds(
      Array.from({ length: 5 }, (_, i) => ({
        left: i * 35 + Math.random() * 15,
        top: Math.random() * 40,
        size: 30 + Math.random() * 25,
      }))
    );

    setSparkles(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    );

    setStars(
      Array.from({ length: 30 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 45,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );

    setMounted(true);
  }, []);

  const speeds = {
    sky: 0.05,
    clouds: 0.1,
    horizon: 0.15,
    farWaves: 0.015,
    midWaves: 0.025,
    nearWaves: 0.04,
  };

  // Day/night cycle: t goes from 0 (left/sunrise) to 1 (right/sunset)
  const t = Math.min(1, Math.max(0, boatX / 100));

  // Sky gradient colors interpolated based on position
  const skyGradient = useMemo(() => {
    const top = lerpColor('#1a1c2c', '#0f0c29', t);
    const upper = lerpColor('#29366f', '#1a1040', t);
    const mid = lerpColor('#3b5dc9', '#c94b4b', t);
    const lower = lerpColor('#41a6f6', '#f0a35c', t);
    const bottom = lerpColor('#87CEEB', '#f7c873', t);
    return `linear-gradient(180deg, ${top} 0%, ${upper} 20%, ${mid} 45%, ${lower} 70%, ${bottom} 100%)`;
  }, [t]);

  // Sun color shifts warmer at sunset
  const sunGlow = lerpColor('#ffcd75', '#ff6b35', t);
  const sunOuter = lerpColor('#ef7d57', '#cc3300', t);

  // Star opacity: invisible on left, fully visible on right
  const starOpacity = Math.max(0, (t - 0.4) / 0.6);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient — shifts from day to sunset */}
      <div
        className="absolute inset-0"
        style={{ background: skyGradient }}
      />

      {/* Stars — fade in toward dusk side */}
      {mounted && starOpacity > 0 && (
        <div className="absolute inset-0" style={{ opacity: starOpacity, pointerEvents: 'none' }}>
          {stars.map((star, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: '#fff',
                borderRadius: '50%',
                boxShadow: '0 0 4px 1px rgba(255,255,255,0.6)',
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun */}
      <div
        className="absolute"
        style={{
          top: '8%',
          right: `${15 + boatX * speeds.sky}%`,
          width: '100px',
          height: '100px',
          background: `radial-gradient(circle, ${sunGlow} 0%, ${sunOuter} 40%, transparent 70%)`,
          borderRadius: '50%',
          boxShadow: `0 0 80px 30px rgba(255, 205, 117, ${0.5 - t * 0.2})`,
        }}
      />

      {/* Clouds layer - far */}
      {mounted && (
        <div
          className="absolute w-[200%] h-20"
          style={{
            top: '12%',
            transform: `translateX(${-boatX * speeds.clouds}%)`,
          }}
        >
          {farClouds.map((cloud, i) => (
            <div
              key={`cloud-far-${i}`}
              className="absolute opacity-60"
              style={{
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
              }}
            >
              <CloudPixel size={cloud.size} />
            </div>
          ))}
        </div>
      )}

      {/* Clouds layer - near */}
      {mounted && (
        <div
          className="absolute w-[200%] h-20"
          style={{
            top: '5%',
            transform: `translateX(${-boatX * speeds.clouds * 1.5}%)`,
          }}
        >
          {nearClouds.map((cloud, i) => (
            <div
              key={`cloud-near-${i}`}
              className="absolute opacity-80"
              style={{
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
              }}
            >
              <CloudPixel size={cloud.size} />
            </div>
          ))}
        </div>
      )}

      {/* Horizon ocean base */}
      <div
        className="absolute w-full"
        style={{
          top: '45%',
          bottom: 0,
          background: 'linear-gradient(180deg, #87CEEB 0%, #5dade2 5%, #3498db 15%, #2471a3 35%, #1a5276 60%, #1a1c2c 100%)',
        }}
      />

      {/* Far wave layer */}
      <div
        className="absolute w-[300%]"
        style={{
          top: '48%',
          height: '20%',
          transform: `translateX(${-boatX * speeds.farWaves}%)`,
        }}
      >
        <WaveSVG color="#2980b9" highlightColor="#5dade2" speed="slow" />
      </div>

      {/* Mid wave layer */}
      <div
        className="absolute w-[300%]"
        style={{
          top: '55%',
          height: '25%',
          transform: `translateX(${-boatX * speeds.midWaves}%)`,
        }}
      >
        <WaveSVG color="#2471a3" highlightColor="#3498db" speed="medium" />
      </div>

      {/* Near wave layer */}
      <div
        className="absolute w-[300%]"
        style={{
          top: '65%',
          height: '40%',
          transform: `translateX(${-boatX * speeds.nearWaves}%)`,
        }}
      >
        <WaveSVG color="#1a5276" highlightColor="#2471a3" speed="fast" foamColor="#aed6f1" />
      </div>

      {/* Closest wave with foam */}
      <div
        className="absolute w-[300%]"
        style={{
          top: '75%',
          height: '30%',
          transform: `translateX(${-boatX * speeds.nearWaves * 1.1}%)`,
        }}
      >
        <WaveSVG color="#154360" highlightColor="#1a5276" speed="fast" foamColor="#d4e6f1" />
      </div>

      {/* Deep ocean floor */}
      <div
        className="absolute w-full"
        style={{
          top: '85%',
          bottom: 0,
          background: 'linear-gradient(180deg, #154360 0%, #1a1c2c 50%)',
        }}
      />

      {/* Sparkles on water */}
      {mounted && (
        <div
          className="absolute"
          style={{
            top: '50%',
            left: 0,
            right: 0,
            height: '30%',
            pointerEvents: 'none',
          }}
        >
          {sparkles.map((sparkle, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-shimmer"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                width: '6px',
                height: '6px',
                backgroundColor: '#fff',
                boxShadow: '0 0 4px 2px rgba(255,255,255,0.5)',
                animationDelay: `${sparkle.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Seagulls */}
      <div
        className="absolute animate-seagull"
        style={{ top: '18%', animationDelay: '0s' }}
      >
        <SeagullPixel />
      </div>
      <div
        className="absolute animate-seagull"
        style={{ top: '22%', animationDelay: '8s' }}
      >
        <SeagullPixel />
      </div>
    </div>
  );
}

// SVG Wave component with pixelated wave crests
function WaveSVG({
  color,
  highlightColor,
  speed,
  foamColor
}: {
  color: string;
  highlightColor: string;
  speed: 'slow' | 'medium' | 'fast';
  foamColor?: string;
}) {
  const animationClass = {
    slow: 'animate-wave-slow',
    medium: 'animate-wave-medium',
    fast: 'animate-wave-fast',
  }[speed];

  // Pixel wave pattern - each "wave" is 240px wide
  const waveWidth = 240;
  const numWaves = 14;

  return (
    <div className={`absolute inset-0 ${animationClass}`}>
      <svg
        className="w-full h-full pixel-art"
        viewBox={`0 0 ${waveWidth * numWaves} 100`}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <defs>
          <linearGradient id={`waveGrad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="30%" stopColor={color} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Main wave body */}
        <path
          d={generatePixelWavePath(waveWidth, numWaves)}
          fill={`url(#waveGrad-${color})`}
        />

        {/* Foam/crest highlights */}
        {foamColor && (
          <path
            d={generateFoamPath(waveWidth, numWaves)}
            fill={foamColor}
            opacity="0.8"
          />
        )}

        {/* Wave crest highlight line */}
        <path
          d={generateCrestPath(waveWidth, numWaves)}
          fill={highlightColor}
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// Per-wave height offsets — 8-entry cycle gives variety without repetition
const HEIGHT_VARIANTS = [0, 7, -4, 10, 2, -6, 8, -3];

// Generate pixelated wave path with height variation across waves
function generatePixelWavePath(waveWidth: number, numWaves: number): string {
  let path = 'M 0 100 ';

  for (let i = 0; i < numWaves; i++) {
    const x = i * waveWidth;
    const ho = HEIGHT_VARIANTS[i % HEIGHT_VARIANTS.length];

    const peakY   = Math.max(4,         10 + ho);
    const riseY   = Math.max(peakY + 8, 26 + Math.round(ho * 0.5));
    const baseY   = Math.max(riseY + 8, 42 + Math.round(ho * 0.3));
    const troughY = Math.max(baseY + 5, 52 + Math.round(ho * 0.2));

    const p = (f: number) => x + Math.round(waveWidth * f);

    path += [
      `L ${x} 100`,
      `L ${x} ${baseY}`,
      `L ${p(0.1)} ${baseY}`,
      `L ${p(0.1)} ${riseY}`,
      `L ${p(0.25)} ${riseY}`,
      `L ${p(0.25)} ${peakY + 5}`,
      `L ${p(0.375)} ${peakY + 5}`,
      `L ${p(0.375)} ${peakY}`,
      `L ${p(0.5)} ${peakY}`,
      `L ${p(0.5)} ${peakY + 5}`,
      `L ${p(0.625)} ${peakY + 5}`,
      `L ${p(0.625)} ${riseY}`,
      `L ${p(0.75)} ${riseY}`,
      `L ${p(0.75)} ${baseY}`,
      `L ${p(0.875)} ${baseY}`,
      `L ${p(0.875)} ${troughY}`,
      `L ${x + waveWidth} ${troughY}`,
    ].join(' ');
  }

  path += ` L ${waveWidth * numWaves} 100 Z`;
  return path;
}

// Generate foam highlights at wave crests
function generateFoamPath(waveWidth: number, numWaves: number): string {
  let path = '';

  for (let i = 0; i < numWaves; i++) {
    const x = i * waveWidth;
    const ho = HEIGHT_VARIANTS[i % HEIGHT_VARIANTS.length];
    const peakY = Math.max(4, 10 + ho);
    const mid   = x + Math.round(waveWidth * 0.5);
    const left  = x + Math.round(waveWidth * 0.33);
    const right = x + Math.round(waveWidth * 0.67);

    path += [
      `M ${left} ${peakY + 5}`,
      `L ${left} ${peakY + 2}`,
      `L ${mid - 12} ${peakY + 2}`,
      `L ${mid - 12} ${peakY - 1}`,
      `L ${mid + 12} ${peakY - 1}`,
      `L ${mid + 12} ${peakY + 2}`,
      `L ${right} ${peakY + 2}`,
      `L ${right} ${peakY + 5}`,
      `L ${mid + 6} ${peakY + 5}`,
      `L ${mid + 6} ${peakY + 8}`,
      `L ${mid - 6} ${peakY + 8}`,
      `L ${mid - 6} ${peakY + 5}`,
      `Z`,
    ].join(' ');
  }

  return path;
}

// Generate highlight line at wave crests
function generateCrestPath(waveWidth: number, numWaves: number): string {
  let path = '';

  for (let i = 0; i < numWaves; i++) {
    const x = i * waveWidth;
    const ho = HEIGHT_VARIANTS[i % HEIGHT_VARIANTS.length];
    const peakY = Math.max(4, 10 + ho);
    const left  = x + Math.round(waveWidth * 0.375);
    const right = x + Math.round(waveWidth * 0.5);

    path += [
      `M ${left} ${peakY}`,
      `L ${left} ${peakY - 3}`,
      `L ${right} ${peakY - 3}`,
      `L ${right} ${peakY}`,
      `Z`,
    ].join(' ');
  }

  return path;
}

function CloudPixel({ size }: { size: number }) {
  const scale = size / 40;
  return (
    <div
      className="pixel-art"
      style={{
        width: `${40 * scale}px`,
        height: `${20 * scale}px`,
        position: 'relative',
      }}
    >
      {[
        { left: 4, top: 8, w: 8, h: 8 },
        { left: 12, top: 4, w: 8, h: 8 },
        { left: 16, top: 8, w: 12, h: 8 },
        { left: 24, top: 4, w: 8, h: 8 },
        { left: 28, top: 8, w: 8, h: 8 },
      ].map((block, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${block.w * scale}px`,
            height: `${block.h * scale}px`,
            backgroundColor: '#f4f4f4',
            left: `${block.left * scale}px`,
            top: `${block.top * scale}px`,
          }}
        />
      ))}
    </div>
  );
}

function SeagullPixel() {
  return (
    <div className="pixel-art" style={{ width: '24px', height: '12px', position: 'relative' }}>
      {/* Wing tips — flap downward */}
      {[{ left: 0 }, { left: 18 }].map((pos, i) => (
        <div
          key={`tip-${i}`}
          className="animate-wing-tip"
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            backgroundColor: '#1a1c2c',
            left: `${pos.left}px`,
            top: '0px',
          }}
        />
      ))}
      {/* Wing bases — flap upward */}
      {[{ left: 6 }, { left: 12 }].map((pos, i) => (
        <div
          key={`base-${i}`}
          className="animate-wing-base"
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            backgroundColor: '#1a1c2c',
            left: `${pos.left}px`,
            top: '6px',
          }}
        />
      ))}
    </div>
  );
}
