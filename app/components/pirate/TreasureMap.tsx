'use client';

import React from 'react';
import { Ship } from 'lucide-react';
import { IslandData } from './Island';

interface TreasureMapProps {
  islands: IslandData[];
  boatX: number;
  nearestIsland: string | null;
  onNavigate: (position: number) => void;
}

export function TreasureMap({ islands, boatX, nearestIsland, onNavigate }: TreasureMapProps) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]"
      style={{
        width: 'min(92vw, 600px)',
      }}
    >
      {/* Map container */}
      <div className="treasure-map p-4 relative">
        {/* Map title */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-sand-dark border-2 border-wood-dark">
          <span className="font-pixel text-[10px] text-wood-dark">VOYAGE MAP</span>
        </div>

        {/* Route line */}
        <div className="relative h-16 mx-6 my-3">
          {/* Dashed route */}
          <div
            className="absolute top-1/2 left-0 right-0 h-1.5 -translate-y-1/2"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                #5d4037,
                #5d4037 10px,
                transparent 10px,
                transparent 20px
              )`,
            }}
          />

          {/* Gold progress trail — fills as the boat sails */}
          <div
            className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2"
            style={{
              width: `${boatX}%`,
              background: 'linear-gradient(90deg, #ffd700, #f0a35c)',
              boxShadow: '0 0 6px 1px rgba(255, 215, 0, 0.4)',
              transition: 'width 0.3s ease-out',
            }}
          />

          {/* Island markers */}
          {islands.map((island) => (
            <button
              key={island.id}
              aria-label={`Navigate to ${island.label}`}
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                transition-transform hover:scale-110 focus:outline-none focus:scale-110
                ${nearestIsland === island.id ? 'scale-110' : ''}`}
              style={{
                left: `${island.position}%`,
              }}
              onClick={() => onNavigate(island.position)}
              title={island.label}
            >
              <div className="relative">
                {/* Island dot */}
                <div
                  className={`w-6 h-6 rounded-sm ${
                    nearestIsland === island.id
                      ? 'bg-pirate-gold'
                      : boatX >= island.position
                        ? 'bg-pirate-gold/70'
                        : 'bg-wood-dark hover:bg-wood-light'
                  }`}
                  style={{
                    boxShadow: nearestIsland === island.id
                      ? '0 0 12px 3px rgba(255, 215, 0, 0.6)'
                      : boatX >= island.position
                        ? '0 0 6px 1px rgba(255, 215, 0, 0.3)'
                        : '2px 2px 0 #3e2723',
                  }}
                />

                {/* X mark for treasure */}
                <span
                  className={`absolute inset-0 flex items-center justify-center font-pixel text-[10px]
                    ${nearestIsland === island.id ? 'text-wood-dark' : boatX >= island.position ? 'text-wood-dark' : 'text-sand-light'}`}
                >
                  X
                </span>

                {/* Label */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                    font-pixel text-[8px] text-wood-dark"
                >
                  {island.label.split(' ')[0]}
                </div>
              </div>
            </button>
          ))}

          {/* Boat position indicator - no transition for real-time updates */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{
              left: `${boatX}%`,
            }}
          >
            <div className="relative">
              <Ship
                className="w-7 h-7 text-pirate-red"
                style={{
                  filter: 'drop-shadow(2px 2px 0 #5d4037)',
                }}
              />
              {/* Ripple effect */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-ocean-light rounded-full opacity-60"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Compass rose decoration */}
        <div className="absolute -right-3 -top-3 w-12 h-12">
          <CompassRose />
        </div>

        {/* Controls hint */}
        <div className="flex justify-center gap-6 mt-2 font-pixel text-[8px] text-wood-dark opacity-80">
          <span>CLICK to sail</span>
          <span className="text-pirate-gold">|</span>
          <span>ARROWS to steer</span>
          <span className="text-pirate-gold">|</span>
          <span>SPACE to anchor</span>
        </div>
      </div>
    </div>
  );
}

function CompassRose() {
  return (
    <div className="relative w-full h-full">
      {/* Circle */}
      <div
        className="absolute inset-1 rounded-full"
        style={{
          backgroundColor: '#f5d6a5',
          border: '3px solid #5d4037',
          boxShadow: '2px 2px 0 #3e2723',
        }}
      />
      {/* N marker */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-pirate-red font-bold"
        style={{ lineHeight: 1 }}
      >
        N
      </div>
      {/* Cross */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '3px',
          height: '20px',
          backgroundColor: '#5d4037',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '20px',
          height: '3px',
          backgroundColor: '#5d4037',
        }}
      />
      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pirate-red"
      />
    </div>
  );
}
