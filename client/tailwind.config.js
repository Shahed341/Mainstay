/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/tailwind.config.js
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          action: '#204f32',  // Core Action Color
          'action-hover': '#183b26',
          'action-light': '#f2f7f4',
          deep: '#0b1a11',    // Deep Dark Shade
          pine: '#204f32',    // Main Forest Green
          sage: '#99c5b0',    // Sage Tone
          mint: '#c4ded0',    // Pale Mint Tone
          'mint-light': '#f2f7f4',
        },
        mainstay: {
          50: '#f2f7f4',
          100: '#e2efe7',
          200: '#c4ded0',
          300: '#99c5b0',
          400: '#6ba58a',
          500: '#488768',
          600: '#336d4f',
          700: '#204f32',     // Core Action Button & Branding
          800: '#183b26',     // Action Button Hover
          900: '#122c1d',
          950: '#0b1a11',
        },
        primary: {
          50: '#f2f7f4',
          100: '#e2efe7',
          200: '#c4ded0',
          300: '#99c5b0',
          400: '#6ba58a',
          500: '#488768',
          600: '#336d4f',
          700: '#204f32',
          800: '#183b26',
          900: '#122c1d',
          950: '#0b1a11',
        }
      }
    },
  },
  plugins: [],
}
