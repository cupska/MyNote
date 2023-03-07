/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
    },
    extend: {
      colors : {
          primary : '#1b2825',
          econdary: '#f6f2f3',
          accent : '#00d231',
          }
    },
    plugins: [
      require('tailwind-scrollbar')({ nocompatible: true }),
    ],
  }