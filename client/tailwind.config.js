/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        climate: ['Climate Crisis', 'sans serif'],
        space: ['Space Grotesk', 'sans serif'],
        nunito: ['Nunito Sans', 'sans serif'],
      },
    },
  },
  plugins: [],
}