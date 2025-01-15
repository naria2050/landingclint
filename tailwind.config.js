/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gradientColorStops: theme => ({
        'purple': {
          '600': theme('colors.purple.600'),
          '700': theme('colors.purple.700'),
        },
        'indigo': {
          '600': theme('colors.indigo.600'),
          '700': theme('colors.indigo.700'),
        },
      }),
    },
  },
  plugins: [require('daisyui')],
}

