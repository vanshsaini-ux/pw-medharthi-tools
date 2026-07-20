import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0F1E',
          900: '#0F1830',
          800: '#152040',
          700: '#1D2C55',
          600: '#293C70'
        },
        paper: '#F4F6F9',
        amber: {
          500: '#E8A33D',
          600: '#D6892A',
          100: '#FBEBD3'
        },
        teal: {
          500: '#1E8C7A',
          100: '#D9F0EA'
        },
        coral: {
          500: '#D8564A',
          100: '#FBE2DF'
        }
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace']
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
