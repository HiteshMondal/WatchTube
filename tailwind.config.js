/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    colors: {
      primary: "#0f0f0f",       // Deep charcoal (main background)
      accent: "#e50914",        
      light: {
        100: "#f5f5f5",         // Soft white text
        200: "#d4d4d4",         // Subtext or muted labels
        300: "#a1a1aa",         // Border/text hint
      },
      dark: {
        100: "#1e1e1e",         // Card backgrounds / elevated surfaces
        200: "#121212",         // Deep dark for modals, drawers
        300: "#000000",         // Pure black (rare use)
      },
    },
  },
};
export const plugins = [];
