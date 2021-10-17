const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'dosis': ['Dosis', 'sans-serif']
      },
      colors: {
        orange: colors.orange,
        lime: colors.lime
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
