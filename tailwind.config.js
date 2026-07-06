/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // CSS variable-driven — automatically responds to .dark class
        base: {
          950: 'rgb(var(--c-950) / <alpha-value>)',
          900: 'rgb(var(--c-900) / <alpha-value>)',
          850: 'rgb(var(--c-850) / <alpha-value>)',
          800: 'rgb(var(--c-800) / <alpha-value>)',
          700: 'rgb(var(--c-700) / <alpha-value>)',
          600: 'rgb(var(--c-600) / <alpha-value>)',
          500: 'rgb(var(--c-500) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#6e5bff',
          50: '#f1edff',
          100: '#e3dcff',
          300: '#b7a6ff',
          400: '#9583ff',
          500: '#6e5bff',
          600: '#5640e6',
          700: '#4330b8',
        },
        glow: {
          cyan: '#3fe0d0',
          coral: '#ff6b6b',
          amber: '#ffb454',
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.12)',
        glow: '0 0 24px rgba(110,91,255,0.35)',
      },
      backgroundImage: {
        'mesh-1': 'radial-gradient(at 0% 0%, rgba(110,91,255,0.18) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(63,224,208,0.12) 0, transparent 50%)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'pulse-soft': { '0%,100%': { opacity: 1 }, '50%': { opacity: .55 } },
        shimmer: { '0%': { backgroundPosition: '-600px 0' }, '100%': { backgroundPosition: '600px 0' } },
      },
      animation: {
        'fade-up': 'fade-up .5s ease both',
        'pulse-soft': 'pulse-soft 2.2s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite linear',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
