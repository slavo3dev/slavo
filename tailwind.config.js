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
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),   
    display: ["group-hover"], 
  },
  plugins: [require("@tailwindcss/typography")],
};

