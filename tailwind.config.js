/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '.dark-theme'],
  plugins: [
    require('@tailwindcss/typography'),
    require("tailwindcss-radix")(),
  ],
}
