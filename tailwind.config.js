const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('tailwindcss/colors');
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
      },
      colors: {
        primary: '#000',
        accent: 'rgb(50,192,239)',
        secondary: '#001352',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-sarif'],
        grostek: ['Space Grotesk', 'sans-sarif'],
        dmsans: ['DM Sans', 'sans-sarif'],
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(130deg, rgba(0, 94, 255, 0.7) 0%, rgba(0, 112, 255, 0.7) 50%, rgba(0, 150, 255, 0.7) 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
