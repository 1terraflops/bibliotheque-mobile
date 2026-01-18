/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D97126",
        dark: "#282b28",
        darker: "#161a22",
        light: "#d1c7bc",
        grey: "#878787",
        coffee: "#b3a2a2",
        coffeish: "#58574b",
        bear: "#403030",
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-500": ["Inter_500Medium"],
        "inter-600": ["Inter_600SemiBold"],
        "inter-700": ["Inter_700Bold"],
        "roboto-mono": ["RobotoMono_400Regular"],
        "nunito-sans": ["NunitoSans_400Regular"],
      },
    },
  },
  plugins: [],
};
