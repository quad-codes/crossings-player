module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "white",
				"on-background": "black",
				"dark-background": "black",
				"dark-on-background": "white",
				t: "red",
			},
			fontFamily: { "mono-base": "Iosevka" },
		},
	},
	plugins: [],
}
