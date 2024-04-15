/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        accent: 'rgb(50,192,239)',
        secondary: '#2563eb'
      },
      fontFamily: {
        poppins: ['Poppins' ,'sans-sarif'],
        grostek: ['Space Grotesk', 'sans-sarif'],
        dmsans: ['DM Sans', 'sans-sarif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}