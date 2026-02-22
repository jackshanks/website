// 8-bit Pirate Color Palette
// Based on the PICO-8 palette with pirate-themed additions

export const colors = {
  // Ocean colors
  ocean: {
    deep: '#1a1c2c',
    mid: '#2c3e50',
    light: '#3498db',
    surface: '#5dade2',
    foam: '#73eff7',
  },

  // Beach/Island colors
  sand: {
    light: '#f5d6a5',
    dark: '#d4a574',
    wet: '#c4a574',
  },

  // Wood/Ship colors
  wood: {
    dark: '#5d4037',
    light: '#8d6e63',
    plank: '#795548',
  },

  // Pirate accent colors
  accent: {
    gold: '#ffd700',
    red: '#e74c3c',
    cream: '#ffecd2',
    flag: '#1a1a2e',
  },

  // Pixel art palette (PICO-8 inspired)
  pixel: {
    black: '#1a1c2c',
    darkPurple: '#5d275d',
    darkRed: '#b13e53',
    orange: '#ef7d57',
    yellow: '#ffcd75',
    lightGreen: '#a7f070',
    green: '#38b764',
    darkTeal: '#257179',
    darkBlue: '#29366f',
    blue: '#3b5dc9',
    lightBlue: '#41a6f6',
    cyan: '#73eff7',
    white: '#f4f4f4',
    lightGray: '#94b0c2',
    gray: '#566c86',
    darkGray: '#333c57',
  },

  // Sky gradient stops
  sky: {
    day: ['#87CEEB', '#B0E0E6', '#E0FFFF'],
    sunset: ['#FF6B6B', '#FFE66D', '#4ECDC4'],
    night: ['#1a1c2c', '#29366f', '#3b5dc9'],
  },
} as const;

// Gradient presets for easy use
export const gradients = {
  ocean: `linear-gradient(180deg, ${colors.ocean.surface} 0%, ${colors.ocean.light} 30%, ${colors.ocean.mid} 70%, ${colors.ocean.deep} 100%)`,
  sky: `linear-gradient(180deg, ${colors.sky.day[0]} 0%, ${colors.sky.day[1]} 50%, ${colors.sky.day[2]} 100%)`,
  sand: `linear-gradient(180deg, ${colors.sand.light} 0%, ${colors.sand.dark} 100%)`,
  wood: `linear-gradient(90deg, ${colors.wood.dark} 0%, ${colors.wood.light} 50%, ${colors.wood.dark} 100%)`,
} as const;

export type ColorPalette = typeof colors;
export type Gradients = typeof gradients;
