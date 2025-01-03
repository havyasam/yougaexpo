/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include all your component file paths here
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/src/screens/**/*.{jsx,js}"
  ],
  
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
