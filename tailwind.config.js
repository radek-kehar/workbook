/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        negative: 'var(--color-negative)',
        positive: 'var(--color-positive)',
        'theme-text': 'var(--color-text-theme)',
        'theme-background': 'var(--color-bg-theme)',
      },
      gridTemplateRows: {
        '11': 'repeat(11, minmax(0, 1fr))'
      }
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  variants: {
    backgroundColor: ['active'],
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
