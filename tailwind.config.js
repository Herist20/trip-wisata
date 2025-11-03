/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#39FF14',
          light: '#5FFF3D',
          dark: '#2ECC10',
        },
        secondary: {
          DEFAULT: '#024F83',
          light: '#0369A1',
          dark: '#013A61',
        },
        accent: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          DEFAULT: '#1F2937',
          light: '#4B5563',
          dark: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
