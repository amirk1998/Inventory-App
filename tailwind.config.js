/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: ['./src/js/**/*.js', './public/index.html'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['iranyekan'],
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
};
