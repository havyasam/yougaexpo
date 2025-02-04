/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}",'./app/src/screens/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray50: "rgb(243 244 246)",
        violet1: "rgb(2, 21, 38)",
        clr1 : "rgb(249,134,45)",
        grey1:"#757780",
        grey2:"#E6E6E6",
        orange1:"#F9862D",
        yellow1:'#FECE00'
        
      },
    },
  },
  plugins: [],
}