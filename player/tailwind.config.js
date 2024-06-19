/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				"on-background": "var(--color-on-background)",
				"grid-background": "var(--color-grid-background)",
				"on-grid-background": "var(--color-on-grid-background)",
				"on-grid-background-correct": "var(--color-on-grid-background-correct)",
				"grid-selection": "var(--color-grid-selection)",
				"grid-extension": "var(--color-grid-extension)",
				t: "red",
			},
			// borderWidth: {
			// hairline: hairlineWidth(),
			// },
			// spacing: {
			// 	st: "var(--safe-area-inset-top)",
			// 	sb: "var(--safe-area-inset-bottom)",
			// 	sl: "var(--safe-area-inset-left)",
			// 	sr: "var(--safe-area-inset-right)",
			// },
			fontFamily: {
				"mono-base": "Iosevka",
			},
		},
	},
	plugins: [],
}
