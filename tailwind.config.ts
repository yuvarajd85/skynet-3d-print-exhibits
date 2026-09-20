import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        obsidian: {
          950: '#05060a',
          900: '#0a0c12',
          800: '#12151d',
          700: '#1b1f2b',
          600: '#262b3a',
        },
        glow: {
          cyan: '#5eead4',
          violet: '#a78bfa',
          amber: '#fbbf24',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(94, 234, 212, 0.35)',
        'glow-violet': '0 0 40px -10px rgba(167, 139, 250, 0.35)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse at top, rgba(94,234,212,0.08), transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
