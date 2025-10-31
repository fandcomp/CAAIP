/**** Tailwind CSS Config for CAAIP Website ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        caaip: {
          blue: '#0B3C68', // biru tua utama
          blueLight: '#165A9A',
          gray: '#6B7280',
          light: '#F5F7FA',
          dark: '#0A2540'
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
