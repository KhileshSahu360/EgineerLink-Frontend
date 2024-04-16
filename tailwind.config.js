/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: '#800082',
        bgColor:'#f4f2ee', // Replace with your hex color code
        searchBg:'#ffe8ff'
      },
    },
  },
  plugins: [],
}