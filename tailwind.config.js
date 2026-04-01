/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
