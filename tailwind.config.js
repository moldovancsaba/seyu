/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      colors: {
        primary: {
          DEFAULT: '#F7870F',
          dark: '#9B0F7A',
          light: '#FECF01'
        },
        secondary: {
          DEFAULT: '#110C9A',
          dark: '#0D0A77',
          light: '#3931B8'
        },
        text: {
          DEFAULT: '#343434',
          light: '#FFFFFF'
        },
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
        'gradient-primary': 'linear-gradient(45deg, #110C9A 0%, #9B0F7A 26%, #F7870F 71%, #FECF01 100%)',
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
        'glow': '0 0 20px rgba(247, 135, 15, 0.5)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
