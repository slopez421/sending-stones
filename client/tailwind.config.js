/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["autumn"],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot:":root",
  },
}

