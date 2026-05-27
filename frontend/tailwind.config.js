/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#0d1117',
          800: '#161b22',
          700: '#1c2128',
          600: '#22262d',
        },
        border: '#30363d',
        accent: '#4ade80',
      },
    },
  },
  plugins: [],
}

