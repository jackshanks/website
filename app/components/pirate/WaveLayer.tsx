'use client';

import React from 'react';

interface WaveLayerProps {
  layer: 'far' | 'mid' | 'near';
  boatX: number;
}

const layerConfig = {
  far: {
    top: '62%',
    height: '8%',
    speed: 0.3,
    color: 'rgba(44, 62, 80, 0.9)',
    waveHeight: 8,
    waveWidth: 120,
    animation: 'animate-wave-slow',
  },
  mid: {
    top: '68%',
    height: '12%',
    speed: 0.5,
    color: 'rgba(52, 152, 219, 0.9)',
    waveHeight: 12,
    waveWidth: 80,
    animation: 'animate-wave-medium',
  },
  near: {
    top: '76%',
    height: '30%',
    speed: 0.7,
    color: 'rgba(26, 28, 44, 0.95)',
    waveHeight: 16,
    waveWidth: 60,
    animation: 'animate-wave-fast',
  },
};

export function WaveLayer({ layer, boatX }: WaveLayerProps) {
  const config = layerConfig[layer];

  return (
    <div
      className={`absolute w-[400%] ${config.animation}`}
      style={{
        top: config.top,
        height: config.height,
        transform: `translateX(${-boatX * config.speed}%)`,
      }}
    >
      {/* Base color */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: config.color }}
      />

      {/* Wave pattern SVG */}
      <svg
        className="absolute w-full pixel-art"
        style={{
          top: `-${config.waveHeight}px`,
          height: `${config.waveHeight}px`,
        }}
        viewBox={`0 0 ${config.waveWidth * 10} ${config.waveHeight}`}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <path
          d={generateWavePath(config.waveWidth, config.waveHeight, 10)}
          fill={config.color}
        />
      </svg>

      {/* Foam/highlights for near waves */}
      {layer === 'near' && (
        <div
          className="absolute w-full h-4"
          style={{
            top: 0,
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent ${config.waveWidth * 0.7}px,
                rgba(244, 244, 244, 0.5) ${config.waveWidth * 0.7}px,
                rgba(244, 244, 244, 0.5) ${config.waveWidth * 0.8}px,
                rgba(115, 239, 247, 0.3) ${config.waveWidth * 0.8}px,
                rgba(115, 239, 247, 0.3) ${config.waveWidth}px
              )
            `,
          }}
        />
      )}

      {/* Light reflections for mid waves */}
      {layer === 'mid' && (
        <div
          className="absolute w-full h-2 opacity-40"
          style={{
            top: 0,
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent ${config.waveWidth * 0.6}px,
                rgba(115, 239, 247, 0.6) ${config.waveWidth * 0.6}px,
                rgba(115, 239, 247, 0.6) ${config.waveWidth * 0.7}px,
                transparent ${config.waveWidth * 0.7}px,
                transparent ${config.waveWidth}px
              )
            `,
          }}
        />
      )}
    </div>
  );
}

// Generate a pixelated wave path
function generateWavePath(waveWidth: number, waveHeight: number, repetitions: number): string {
  let path = `M 0 ${waveHeight} `;

  for (let i = 0; i < repetitions; i++) {
    const x = i * waveWidth;
    // Pixelated wave shape (step pattern)
    path += `
      L ${x} ${waveHeight}
      L ${x} ${waveHeight * 0.7}
      L ${x + waveWidth * 0.15} ${waveHeight * 0.7}
      L ${x + waveWidth * 0.15} ${waveHeight * 0.4}
      L ${x + waveWidth * 0.35} ${waveHeight * 0.4}
      L ${x + waveWidth * 0.35} ${waveHeight * 0.2}
      L ${x + waveWidth * 0.5} ${waveHeight * 0.2}
      L ${x + waveWidth * 0.5} ${waveHeight * 0.4}
      L ${x + waveWidth * 0.65} ${waveHeight * 0.4}
      L ${x + waveWidth * 0.65} ${waveHeight * 0.7}
      L ${x + waveWidth * 0.85} ${waveHeight * 0.7}
      L ${x + waveWidth * 0.85} ${waveHeight}
      L ${x + waveWidth} ${waveHeight}
    `;
  }

  path += `L ${waveWidth * repetitions} ${waveHeight * 2} L 0 ${waveHeight * 2} Z`;

  return path;
}
