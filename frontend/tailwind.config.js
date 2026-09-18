/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fbf2f4',
          100: '#f6e4e7',
          200: '#efcbd2',
          300: '#e3a5b1',
          400: '#d37588',
          500: '#bf4962',
          600: '#a5334c',
          700: '#8b273d',
          800: '#752335',
          900: '#580d1a', // Deep Royal Maroon
          950: '#38060e',
        },
        gold: {
          50: '#fbf9ed',
          100: '#f6f0cf',
          200: '#ede09e',
          300: '#e1cb66',
          400: '#d7b73c',
          500: '#d4af37', // Antique Gold
          600: '#b88d27',
          700: '#926a21',
          800: '#795521',
          900: '#674720',
          950: '#3c260f',
        },
        royalRed: '#800020',
        burgundy: '#6A0D25',
        ivory: '#FAF7F2',
        cream: '#FFFDF6',
        saffron: '#FF7722',
        marigold: '#F37021',
        emeraldGreen: '#0D5C3A',
        indianRose: '#C88A8A',
        terracotta: '#E07A5F',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Cinzel"', 'serif'],
        display: ['"Rozha One"', '"Cinzel Decorative"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #d4af37 0%, #fff2b2 50%, #b88d27 100%)',
        'royal-gradient': 'linear-gradient(180deg, #580d1a 0%, #38060e 100%)',
        'mandala-pattern': "radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'royal': '0 10px 30px -10px rgba(88, 13, 26, 0.4)',
      },
    },
  },
  plugins: [],
};
