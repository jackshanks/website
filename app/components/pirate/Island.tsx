'use client';

import React from 'react';
import { Anchor } from 'lucide-react';

export interface IslandData {
  id: string;
  position: number;
  label: string;
  emoji?: string;
}

interface IslandProps {
  island: IslandData;
  isNearby: boolean;
  onAnchor: () => void;
}

export function Island({ island, isNearby, onAnchor }: IslandProps) {
  const config = getIslandConfig(island.id);

  return (
    <div
      className="absolute"
      style={{
        left: `${island.position}%`,
        bottom: `${config.bottomOffset}%`,
        transform: 'translateX(-50%)',
        zIndex: 30,
      }}
    >
      <div className="relative">
        {/* Island SVG */}
        <IslandSVG type={config.type} />

        {/* Island label */}
        <div
          className="absolute left-1/2 -translate-x-1/2 font-pixel text-center whitespace-nowrap"
          style={{
            bottom: `${config.labelOffset}px`,
            color: '#ffd700',
            textShadow: '2px 2px 0 #1a1c2c, -1px -1px 0 #1a1c2c, 1px -1px 0 #1a1c2c, -1px 1px 0 #1a1c2c',
            fontSize: '14px',
          }}
        >
          {island.label}
        </div>

          {/* Anchor prompt when nearby */}
          {isNearby && (
              // positioning
              <div className="absolute left-1/2 -translate-x-1/2"
                  style={{bottom: `${config.labelOffset + 60}px`,}}
              >
                  {/* animation and interaction */}
                  <div
                      className="animate-anchor-prompt cursor-pointer flex flex-col items-center gap-2"
                      onClick={onAnchor}
                  >
                      <button
                          className="pixel-button flex items-center gap-3"
                          style={{ fontSize: '14px', padding: '16px 32px' }}
                      >
                          <Anchor className="w-5 h-5" />
                          <span>ANCHOR</span>
                      </button>
                      <div className="font-pixel text-xs text-pirate-gold">
                          Press SPACE
                      </div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}

interface IslandConfig {
  type: 'port' | 'tropical' | 'mountain' | 'cove';
  bottomOffset: number;
  labelOffset: number;
}

function getIslandConfig(id: string): IslandConfig {
  switch (id) {
    case 'home':
      return { type: 'port', bottomOffset: 18, labelOffset: 280 };
    case 'skills':
      return { type: 'tropical', bottomOffset: 16, labelOffset: 300 };
    case 'projects':
      return { type: 'mountain', bottomOffset: 14, labelOffset: 320 };
    case 'contact':
      return { type: 'cove', bottomOffset: 17, labelOffset: 290 };
    default:
      return { type: 'tropical', bottomOffset: 16, labelOffset: 300 };
  }
}

function IslandSVG({ type }: { type: 'port' | 'tropical' | 'mountain' | 'cove' }) {
  switch (type) {
    case 'port':
      return <PortIsland />;
    case 'tropical':
      return <TropicalIsland />;
    case 'mountain':
      return <MountainIsland />;
    case 'cove':
      return <CoveIsland />;
    default:
      return <TropicalIsland />;
  }
}

// Pixel Palm Tree component with sway animation
function PixelPalmTree({ x, y, size = 'large', delay = 0 }: { x: number; y: number; size?: 'large' | 'small'; delay?: number }) {
  const s = size === 'large' ? 6 : 4; // pixel size
  const trunkHeight = size === 'large' ? 10 : 7;

  return (
    <g
      className="animate-palm-sway"
      style={{
        transformOrigin: `${x + 2*s}px ${y + (trunkHeight + 4)*s}px`,
        animationDelay: `${delay}s`
      }}
    >
      {/* Trunk */}
      <rect x={x + s} y={y + 4*s} width={2*s} height={trunkHeight*s} fill="#5d4037" />
      <rect x={x + 1.5*s} y={y + 5*s} width={s} height={(trunkHeight-2)*s} fill="#795548" />

      {/* Coconuts */}
      <rect x={x + 0.5*s} y={y + 3*s} width={s} height={s} fill="#5d4037" />
      <rect x={x + 2.5*s} y={y + 3*s} width={s} height={s} fill="#5d4037" />

      {/* Leaves - blocky pixel style */}
      {/* Top center */}
      <rect x={x + s} y={y} width={2*s} height={s} fill="#38b764" />

      {/* Second row */}
      <rect x={x} y={y + s} width={s} height={s} fill="#257179" />
      <rect x={x + s} y={y + s} width={2*s} height={s} fill="#38b764" />
      <rect x={x + 3*s} y={y + s} width={s} height={s} fill="#257179" />

      {/* Third row - wider */}
      <rect x={x - s} y={y + 2*s} width={s} height={s} fill="#38b764" />
      <rect x={x} y={y + 2*s} width={s} height={s} fill="#38b764" />
      <rect x={x + s} y={y + 2*s} width={2*s} height={s} fill="#257179" />
      <rect x={x + 3*s} y={y + 2*s} width={s} height={s} fill="#38b764" />
      <rect x={x + 4*s} y={y + 2*s} width={s} height={s} fill="#38b764" />

      {/* Drooping fronds */}
      <rect x={x - 2*s} y={y + 3*s} width={s} height={s} fill="#257179" />
      <rect x={x + 5*s} y={y + 3*s} width={s} height={s} fill="#257179" />
    </g>
  );
}

// Home Port Island
function PortIsland() {
  return (
    <svg width="420" height="270" viewBox="0 0 420 270" className="pixel-art" shapeRendering="crispEdges">
      {/* Water reflection */}
      <rect x="45" y="248" width="330" height="18" fill="#2471a3" opacity="0.3" />

      {/* Main island base - layered for depth */}
      <rect x="60" y="210" width="270" height="18" fill="#b8956a" />
      <rect x="68" y="192" width="255" height="21" fill="#c4a574" />
      <rect x="75" y="174" width="240" height="21" fill="#d4a574" />
      <rect x="90" y="156" width="210" height="21" fill="#e6c994" />
      <rect x="112" y="142" width="165" height="18" fill="#f5d6a5" />

      {/* Grass patches on top */}
      <rect x="120" y="138" width="27" height="9" fill="#38b764" />
      <rect x="158" y="135" width="36" height="9" fill="#257179" />
      <rect x="210" y="138" width="27" height="9" fill="#38b764" />

      {/* Dock extending right */}
      <rect x="278" y="162" width="105" height="15" fill="#8d6e63" />
      <rect x="278" y="162" width="105" height="6" fill="#a1887f" />
      {/* Dock posts */}
      <rect x="293" y="177" width="9" height="45" fill="#5d4037" />
      <rect x="330" y="177" width="9" height="45" fill="#5d4037" />
      <rect x="368" y="177" width="9" height="30" fill="#5d4037" />
      {/* Lantern */}
      <rect x="369" y="147" width="9" height="9" fill="#ffd700" />
      <rect x="371" y="156" width="6" height="6" fill="#ef7d57" />

      {/* Hut - positioned on island surface */}
      <rect x="128" y="97" width="68" height="48" fill="#8d6e63" />
      <rect x="128" y="97" width="68" height="9" fill="#a1887f" />
      {/* Roof - stepped pyramid */}
      <rect x="120" y="82" width="83" height="9" fill="#b13e53" />
      <rect x="128" y="73" width="68" height="9" fill="#b13e53" />
      <rect x="135" y="64" width="53" height="9" fill="#ef7d57" />
      <rect x="143" y="55" width="38" height="9" fill="#ef7d57" />
      <rect x="153" y="46" width="17" height="9" fill="#ef7d57" />
      {/* Door */}
      <rect x="150" y="117" width="18" height="28" fill="#5d4037" />
      {/* Window */}
      <rect x="173" y="108" width="12" height="12" fill="#29366f" />

      {/* Palm tree - positioned so trunk base sits on island */}
      <PixelPalmTree x={225} y={58} size="large" delay={0} />
    </svg>
  );
}

// Skills - Tropical Island with Treasure
function TropicalIsland() {
  return (
    <svg width="450" height="300" viewBox="0 0 450 300" className="pixel-art" shapeRendering="crispEdges">
      {/* Water reflection */}
      <rect x="38" y="278" width="375" height="18" fill="#2471a3" opacity="0.3" />

      {/* Main island base */}
      <rect x="45" y="240" width="360" height="21" fill="#b8956a" />
      <rect x="57" y="219" width="336" height="24" fill="#c4a574" />
      <rect x="72" y="195" width="306" height="27" fill="#d4a574" />
      <rect x="98" y="174" width="255" height="24" fill="#e6c994" />
      <rect x="128" y="156" width="195" height="21" fill="#f5d6a5" />

      {/* Grass/vegetation patches */}
      <rect x="135" y="150" width="36" height="9" fill="#38b764" />
      <rect x="188" y="147" width="45" height="9" fill="#257179" />
      <rect x="252" y="150" width="30" height="9" fill="#38b764" />
      <rect x="300" y="153" width="24" height="9" fill="#257179" />

      {/* Main palm tree - trunk base at y=156 (island top), so position leaves higher */}
      <PixelPalmTree x={180} y={72} size="large" delay={0} />

      {/* Second palm tree - positioned on island surface */}
      <PixelPalmTree x={300} y={112} size="small" delay={0.5} />

      {/* Treasure chest on island surface */}
      <rect x="105" y="162" width="45" height="9" fill="#ffd700" />
      <rect x="102" y="171" width="51" height="24" fill="#5d4037" />
      <rect x="102" y="171" width="51" height="8" fill="#8d6e63" />
      <rect x="123" y="179" width="9" height="15" fill="#ffd700" />
      <rect x="120" y="176" width="15" height="6" fill="#b8860b" />

      {/* Scattered gold coins on island surface */}
      <rect x="87" y="189" width="9" height="9" fill="#ffd700" />
      <rect x="158" y="186" width="8" height="8" fill="#ffd700" />
      <rect x="93" y="201" width="6" height="6" fill="#b8860b" />
      <rect x="75" y="195" width="8" height="8" fill="#ffd700" />
    </svg>
  );
}

// Projects - Mountain Island
function MountainIsland() {
  return (
    <svg width="450" height="310" viewBox="0 0 540 375" className="pixel-art" shapeRendering="crispEdges">
      {/* Water reflection */}
      <rect x="30" y="353" width="480" height="18" fill="#2471a3" opacity="0.3" />

      {/* Main island base */}
      <rect x="38" y="315" width="465" height="21" fill="#b8956a" />
      <rect x="53" y="291" width="435" height="27" fill="#c4a574" />
      <rect x="75" y="264" width="390" height="30" fill="#d4a574" />
      <rect x="105" y="237" width="330" height="30" fill="#e6c994" />
      <rect x="143" y="217" width="255" height="24" fill="#f5d6a5" />

      {/* Main mountain - sitting on island */}
      <rect x="180" y="199" width="150" height="18" fill="#566c86" />
      <rect x="195" y="181" width="120" height="21" fill="#566c86" />
      <rect x="210" y="160" width="90" height="24" fill="#94b0c2" />
      <rect x="225" y="139" width="60" height="24" fill="#94b0c2" />
      <rect x="237" y="118" width="36" height="24" fill="#94b0c2" />
      <rect x="246" y="97" width="18" height="24" fill="#f4f4f4" />
      <rect x="251" y="79" width="9" height="21" fill="#f4f4f4" />

      {/* Second peak */}
      <rect x="345" y="207" width="83" height="15" fill="#566c86" />
      <rect x="357" y="192" width="60" height="18" fill="#566c86" />
      <rect x="372" y="174" width="33" height="21" fill="#94b0c2" />
      <rect x="381" y="156" width="18" height="21" fill="#94b0c2" />
      <rect x="386" y="141" width="9" height="18" fill="#f4f4f4" />

      {/* Grass/forest patches */}
      <rect x="128" y="213" width="42" height="9" fill="#257179" />
      <rect x="180" y="210" width="30" height="9" fill="#38b764" />
      <rect x="330" y="213" width="36" height="9" fill="#257179" />
      <rect x="383" y="216" width="27" height="9" fill="#38b764" />

      {/* Flag on peak */}
      <rect x="252" y="42" width="6" height="42" fill="#5d4037" />
      <rect x="258" y="42" width="27" height="9" fill="#1a1c2c" />
      <rect x="258" y="51" width="27" height="9" fill="#1a1c2c" />
      <rect x="263" y="46" width="9" height="9" fill="#f4f4f4" />

      {/* Waterfall */}
      <rect x="267" y="118" width="15" height="81" fill="#5dade2" opacity="0.8" />
      <rect x="270" y="121" width="9" height="75" fill="#aed6f1" opacity="0.9" />
      {/* Splash at bottom */}
      <rect x="263" y="199" width="24" height="6" fill="#aed6f1" opacity="0.6" />

      {/* Palm trees - positioned on island surface */}
      <PixelPalmTree x={145} y={133} size="large" delay={0.2} />
      <PixelPalmTree x={370} y={173} size="small" delay={0.7} />
    </svg>
  );
}

// Contact - Cove Island
function CoveIsland() {
  return (
    <svg width="435" height="285" viewBox="0 0 435 285" className="pixel-art" shapeRendering="crispEdges">
      {/* Water reflection */}
      <rect x="38" y="263" width="360" height="18" fill="#2471a3" opacity="0.3" />

      {/* Main island base */}
      <rect x="45" y="225" width="345" height="21" fill="#b8956a" />
      <rect x="57" y="204" width="321" height="24" fill="#c4a574" />
      <rect x="72" y="180" width="291" height="27" fill="#d4a574" />
      <rect x="98" y="159" width="240" height="24" fill="#e6c994" />
      <rect x="120" y="142" width="195" height="21" fill="#f5d6a5" />

      {/* Cove cutout - sand around water */}
      <rect x="165" y="162" width="105" height="24" fill="#f5d6a5" />

      {/* Inner cove water */}
      <rect x="177" y="171" width="81" height="27" fill="#5dade2" />
      <rect x="188" y="177" width="60" height="18" fill="#85c1e9" />
      <rect x="198" y="183" width="39" height="9" fill="#aed6f1" />

      {/* Beach edges around cove */}
      <rect x="168" y="168" width="12" height="21" fill="#f5d6a5" />
      <rect x="255" y="168" width="12" height="21" fill="#f5d6a5" />

      {/* Grass patches */}
      <rect x="128" y="138" width="30" height="9" fill="#38b764" />
      <rect x="168" y="135" width="24" height="9" fill="#257179" />
      <rect x="248" y="135" width="24" height="9" fill="#38b764" />
      <rect x="293" y="138" width="21" height="9" fill="#257179" />

      {/* Palm trees - positioned on island surface */}
      <PixelPalmTree x={116} y={58} size="large" delay={0} />
      <PixelPalmTree x={280} y={98} size="small" delay={0.6} />

      {/* Message bottle in cove */}
      <rect x="210" y="180" width="15" height="8" fill="#aed6f1" />
      <rect x="215" y="174" width="6" height="8" fill="#795548" />
      <rect x="213" y="177" width="9" height="5" fill="#f5d6a5" />

      {/* Small rowboat */}
      <rect x="228" y="186" width="21" height="8" fill="#8d6e63" />
      <rect x="231" y="183" width="15" height="5" fill="#a1887f" />
      <rect x="239" y="172" width="5" height="12" fill="#5d4037" />

      {/* Seashells on beach */}
      <rect x="173" y="195" width="6" height="6" fill="#f8bbd0" />
      <rect x="258" y="192" width="6" height="6" fill="#ffcd75" />
      <rect x="188" y="201" width="5" height="5" fill="#f4f4f4" />
    </svg>
  );
}
