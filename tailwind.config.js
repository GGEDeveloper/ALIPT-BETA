/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        primary: "#000000",
        "primary-dark": "#000000",
        secondary: "#FF6B00",
        "secondary-dark": "#E05A00",
        accent: "#FF4C00",
        light: "#F5F5F5",
        dark: "#191919"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 