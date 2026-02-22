import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Pirate color palette
        ocean: {
          deep: '#1a1c2c',
          mid: '#2c3e50',
          light: '#3498db',
          surface: '#5dade2',
        },
        sand: {
          light: '#f5d6a5',
          dark: '#d4a574',
        },
        wood: {
          dark: '#5d4037',
          light: '#8d6e63',
        },
        pirate: {
          gold: '#ffd700',
          red: '#e74c3c',
          cream: '#ffecd2',
        },
        pixel: {
          black: '#1a1c2c',
          darkblue: '#5d275d',
          purple: '#b13e53',
          red: '#ef7d57',
          orange: '#ffcd75',
          yellow: '#a7f070',
          green: '#38b764',
          teal: '#257179',
          darkgray: '#29366f',
          blue: '#3b5dc9',
          lightblue: '#41a6f6',
          cyan: '#73eff7',
          white: '#f4f4f4',
          lightgray: '#94b0c2',
          gray: '#566c86',
          darkergray: '#333c57',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'wave': 'wave 2s ease-in-out infinite',
        'bob': 'bob 3s ease-in-out infinite',
        'sail': 'sail 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        sail: {
          '0%, 100%': { transform: 'skewX(-2deg)' },
          '50%': { transform: 'skewX(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
