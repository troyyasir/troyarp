/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0C111D',
        secondary: '#161B26',
        accent: '#3B82F6',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        rating: '#FFD700'
      }
    },
  },
  plugins: [],
};