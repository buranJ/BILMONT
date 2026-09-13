/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE0',
        green: {
          DEFAULT: '#5A7A2A',
          light: '#7A9E3A',
          dark: '#3D5A1A',
        },
        rust: {
          DEFAULT: '#853b20',
          light: '#A04D2A',
          dark: '#6B2F18',
        },
        navy: '#2A4A5A',
        dark: '#1A1A1A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
