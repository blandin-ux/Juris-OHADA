/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Active le mode sombre basé sur la classe
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
        },
        background: {
          light: '#F9FAFB',
          dark: '#0F172A',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
          'dark-border': '#334155',
        },
      },
    },
  },
  plugins: [],
}
