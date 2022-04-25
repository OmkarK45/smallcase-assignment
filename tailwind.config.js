const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const brandColor = colors.pink
/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig }
 **/
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				gray: colors.neutral,
				brand: brandColor,
			},
		},
	},
	plugins: [],
}
