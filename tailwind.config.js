/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
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
};
export const plugins = [];       