const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				background: "rgb(var(--color-background) / <alpha-value>)",
				"on-background": "rgb(var(--color-on-background) / <alpha-value>)",
				"grid-background": "rgb(var(--color-grid-background) / <alpha-value>)",
				"on-grid-background": "rgb(var(--color-on-grid-background) / <alpha-value>)",
				"on-grid-background-correct":
					"rgb(var(--color-on-grid-background-correct) / <alpha-value>)",
				"grid-selection": "rgb(var(--color-grid-selection) / <alpha-value>)",
				"grid-extension": "rgb(var(--color-grid-extension) / <alpha-value>)",
			},
			borderWidth: {
				hairline: hairlineWidth(),
			},
			spacing: {
				st: "var(--safe-area-inset-top)",
				sb: "var(--safe-area-inset-bottom)",
				sl: "var(--safe-area-inset-left)",
				sr: "var(--safe-area-inset-right)",
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
}
