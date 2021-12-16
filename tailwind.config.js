const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      },
      colors: {
        orange: colors.orange,
        lime: colors.lime,
        sky: colors.sky,
        zinc: colors.zinc,
        emerald: colors.emerald,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
