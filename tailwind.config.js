/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#ab1b6f',
          light: '#ffe0f2',
          medium: '#e362ad',
          // real hover/current link colors pulled from the live site's CSS
          dark: '#6b0f45',
          current: '#750848',
        }
      },
      fontFamily: {
        // the live site renders every heading and body element in Manrope
        montserrat: ['Manrope', 'sans-serif'],
        nunito: ['Manrope', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        // the live site only ever uses 8px (controls/tags) and 16px (frames/cards) —
        // no pill-shaped buttons anywhere
        DEFAULT: '8px',
        card: '16px',
      },
      boxShadow: {
        // soft neutral drop shadow used site-wide (2px 2px 8px #93939340)
        soft: '2px 2px 8px rgba(147, 147, 147, 0.25)',
        'soft-lg': '4px 4px 16px rgba(147, 147, 147, 0.35)',
      },
    },
  },
  plugins: [],
}
