const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    mode: "jit",
    purge: ["./public/**/*.html", "./src/**/*.{js,jsx}"],
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('currentColor')
    }),
    extend: {
      colors: {
        teal: colors.teal,
        blueGray: colors.blueGray,
        cyan: colors.cyan,
        darkblue: {
            '50': '#f4f5f6', 
            '100': '#eaeaec', 
            '200': '#caccd1', 
            '300': '#a9adb5', 
            '400': '#696f7d', 
            '500': '#293145', 
            '600': '#252c3e', 
            '700': '#1f2534', 
            '800': '#191d29', 
            '900': '#141822'
        }
      },
      fontFamily: {
        sans: ['Proxima Nova W01', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
      minWidth: {
          '0': '0',
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'full': '100%',
      }
  },
  variants: {
  },
  plugins: [
  ]
}
