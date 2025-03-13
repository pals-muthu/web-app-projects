/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'], // Adjust paths based on your project
  theme: {
    extend: {
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Custom font
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
