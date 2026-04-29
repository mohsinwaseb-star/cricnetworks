/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cn: {
          lime: '#A8E63D',
          'lime-dark': '#8BC934',
          'lime-light': '#C5F06A',
          green: '#1B4D1B',
          'green-dark': '#0F2D0F',
          'green-mid': '#2A6B2A',
          bg: '#0F2010',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
