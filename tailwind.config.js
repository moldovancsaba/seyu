/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B8FE8',
          dark: '#1B77C7',
          light: '#4BA3EE'
        },
        secondary: {
          DEFAULT: '#1A1C26',
          dark: '#12141B',
          light: '#222534'
        },
        neutral: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(45deg, #2B8FE8 0%, #4BA3EE 100%)',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
