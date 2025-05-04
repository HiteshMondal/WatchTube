/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: '#030012',
        accent: 'darkviolet',
        light: {
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
        },
        dark: {
          100: '#333333',
          200: '#1a1a1a',
          300: '#000000',
        }

      }
    },
  },
  plugins: [],
}       