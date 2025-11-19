/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D97126",
        dark: "#282b28",
        grey: "#878787",
        coffee: "#b3a2a2",
        bear: "#403030",
      },
    },
  },
  plugins: [],
};
