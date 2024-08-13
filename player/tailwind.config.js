const plugin = require("tailwindcss/plugin")
const { hairlineWidth } = require("nativewind/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				"on-background": "var(--color-on-background)",
				"on-background-low": "var(--color-on-background-low)",
				primary: "var(--color-primary)",
				"on-primary": "var(--color-on-primary)",
				opening: "var(--color-opening)",
				"surface-not-started": "var(--color-surface-not-started)",
				"surface-in-progress": "var(--color-surface-in-progress)",
				"surface-done": "var(--color-surface-done)",
				"on-surface": "var(--color-on-surface)",

				t: "red",
			},
			fontFamily: { "mono-base": "Iosevka" },
			borderWidth: {
				hairline: hairlineWidth(),
			},
		},
	},
	plugins: [
		require("nativewind/dist/tailwind/safe-area").safeArea,
		plugin(({ addUtilities }) =>
			addUtilities({
				// usually paired with `absolute`
				".full": {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				},
			}),
		),
	],
}
