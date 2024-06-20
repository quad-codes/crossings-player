module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "white",
				"on-background": "black",
				"surface-not-started": "#6A0DAD",
				"surface-in-progress": "#A76ACD",
				"surface-done": "#DCC1E9",
				"on-surface": "white",
				"dark-background": "black",
				"dark-on-background": "white",
				"dark-surface-not-started": "green",
				"dark-surface-in-progress": "yellow",
				"dark-surface-done": "red",
				"dark-on-surface": "white",
				t: "red",
			},
			fontFamily: { "mono-base": "Iosevka" },
		},
	},
	plugins: [],
}
