const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			borderWidth: {
				hairline: hairlineWidth(),
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
}
