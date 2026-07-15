/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#3B82F6',
          hover: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#14B8A6',
          hover: '#0F766E',
        },
        accent: '#14B8A6',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        darkText: {
          DEFAULT: '#1E293B',
          dark: '#F8FAFC',
        },
        lightText: {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        borderColor: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
      },
      borderRadius: {
        'custom': '20px',
      },
      boxShadow: {
        'healthcare': '0 10px 25px -5px rgba(37, 99, 235, 0.05), 0 8px 16px -8px rgba(0, 0, 0, 0.05)',
        'healthcare-hover': '0 20px 30px -10px rgba(37, 99, 235, 0.12), 0 10px 20px -10px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
