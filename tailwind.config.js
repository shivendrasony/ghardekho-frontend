/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef4ff',
          100: '#d9e8ff',
          200: '#bcd3ff',
          300: '#8eb5ff',
          400: '#598aff',
          500: '#3262f5',
          600: '#1f43eb',
          700: '#162ed8',
          800: '#1927af',
          900: '#0f2744',
          950: '#0a1a30',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, #0f2744 0%, #1a3a5c 50%, #0f2744 100%)",
      },
    },
  },
  plugins: [],
}
