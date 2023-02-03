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
      fontFamily: {
        body: ["Gilroy", "sans-serif"],
        heading: ["Gilroy", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        rossela: ["Conv_Rossela-Demo-2", "serif"],
      },
      fontSize: {
        sm: "0.75rem",
        md: "0.875rem",
        base: "0.938rem",
        h1: "2.5rem",
        h2: "2.125rem",
        h3: "1.5rem",
        h4: "1.3125rem",
        h5: "1.09375rem",
        h6: "0.938rem",
      },
      lineHeight: {
        body: 1.74,
        heading: 1.3,
      },
    },
  },
  plugins: [],
};
