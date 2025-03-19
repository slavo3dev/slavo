/* eslint-disable no-undef */
/* eslint-disable indent */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
    },
      screens: {
        'max-sm': { 'max': '426px' }, // custom max-width for screens smaller than 375px
        'max-xs': { 'max': '326px' },
      },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
    display: ["group-hover"],
    textColor: ["active"],
  },
  plugins: [require("@tailwindcss/typography")],
};
