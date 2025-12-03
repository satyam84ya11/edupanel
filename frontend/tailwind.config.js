/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E4FFF',
        accent: '#2563EB',
        dark: '#1E293B',
        light: '#F4F7FC',
        card: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
