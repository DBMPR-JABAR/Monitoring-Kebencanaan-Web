/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html, js}'
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#16A75C',
        primaryBlue: '#1E88E5',
        primaryYellow: '#FFD026'
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        lora: ['Lora', 'serif'],
        roboto: ['Roboto', 'sans-serif']
      }
    },
  },
}
