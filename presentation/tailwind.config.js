/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Evinova brand colors
        evinovaPink: '#fa7aab',
        evinovaPurple: '#7852A9',
        evinovaPinkLight: '#ffaec7',
        evinovaPinkDark: '#d04e7d',
        evinovaPurpleLight: '#9D7BC1',
        evinovaPurpleDark: '#533C76',
        // Additional colors
        activeGreen: '#36e09e',
        saffron: '#ffcd00'
      }
    },
  },
  plugins: [],
}
