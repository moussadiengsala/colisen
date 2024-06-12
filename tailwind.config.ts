import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'custom-dark-10':'#1A1A1A',
        'custom-dark-40':'#666666',
        'custom-dark-60':'#999999',
        'custom-light-90':'#E6E6E6',
        'custom-light-98':'#FAFAFA',
        'custom-green-60':'#19B373',
        'custom-green-95':'#E9FCF4',
        'custom-sky-60': '#0ea5e9',
        'custom-sky-40': '#172554',
        'custom-sky-50': '#0284c7'
      },
      screens: {
        'tablet': '810px', // => @media (min-width: 640px) { ... }  
        'desktop': '1200px', // => @media (min-width: 1280px) { ... }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config