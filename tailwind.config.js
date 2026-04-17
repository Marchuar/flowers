/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F0E8',
        'bg-subtle': '#EDE7D9',
        'text-primary': '#1C1A17',
        'text-secondary': '#6B6456',
        accent: '#7D9B76',
        'accent-warm': '#C2714F',
        surface: '#FDFAF5',
        border: '#D9D0C1',
        bark: '#1C1A17',
        forest: '#3B6845',
        blush: '#EAC4BC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Fraunces"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        brand: ['"Gloock"', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 1.5s infinite',
        'float-delay2': 'float 8s ease-in-out 3s infinite',
        'float-mobile': 'float-mobile 5s ease-in-out infinite',
        'float-mobile-slow': 'float-mobile 7s ease-in-out infinite',
        'float-mobile-delay': 'float-mobile 6s ease-in-out 1.5s infinite',
        'float-mobile-delay2': 'float-mobile 8s ease-in-out 3s infinite',
        'marquee': 'marquee var(--duration, 30s) linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'meteor': 'meteor var(--speed, 5s) linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'reveal-line': 'revealLine 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-16px) rotate(2deg)' },
          '66%': { transform: 'translateY(-7px) rotate(-1.5deg)' },
        },
        'float-mobile': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '33%': { transform: 'translateY(-16px)' },
          '66%': { transform: 'translateY(-7px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        shimmer: {
          '0%, 90%, 100%': { 'background-position': 'calc(-100% - var(--shimmer-width, 200px)) 0' },
          '30%, 60%': { 'background-position': 'calc(100% + var(--shimmer-width, 200px)) 0' },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        revealLine: {
          from: { transform: 'scaleX(0)', transformOrigin: 'left' },
          to: { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        scaleIn: {
          from: { transform: 'scale(0.94)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
