/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {},
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'algerian': ['helvetica', 'sans-serif'],
      'alata': ['Alata', 'sans-serif'],
    },
    colors: {
      'primary': '#f3f4f6',
      'secondary': '#ffffff',
      'textcol': '#0b1214',
      'accent': '#707070',
      'border': '#e5e5e8',
      'red': '#ff0808',
      'blue': '#1838f0'
    }
  },
  plugins: [],
}