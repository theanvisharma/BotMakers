/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        apple: {
          dark: '#000000',
          darker: '#1c1c1e',
          darkest: '#121212',
          blue: '#0A84FF',
          gray: '#86868b',
          lightgray: '#f5f5f7'
        }
      }
    },
  },
  plugins: [],
}
