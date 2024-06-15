/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#010851",
        secondary: "#9A7AF1",
        tertiary: "#707070",
        pink: "#EE9AE5",
      },
      animation: {
        slide: "slide 2.5s linear infinite",
      },
      boxShadow: {
        "3xl": "0 10px 50px 0px rgba(0,0,0,0.15)",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateY(100%)", opacity: 0.1 },
          "15%": { transform: "translateY(0)", opacity: 1 },
          "30%": { transform: "translateY(0)", opacity: 1 },
          "45%": { transform: "translateY(-100%)", opacity: 1 },
          "100%": { transform: "translateY(-100%)", opacity: 0.1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
