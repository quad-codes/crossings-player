const { reduce } = require("lodash")

/**
 * @typedef {"background" | "on-background" | "surface-not-started" | "surface-in-progress" | "surface-done" | "on-surface"} ColorName
 * @typedef {Record<ColorName, string>} Colors
 */

/** @type Record<"light"|"dark", Colors> */
const colors = {
	light: {
		background: "white",
		"on-background": "black",
		"surface-not-started": "#6A0DAD",
		"surface-in-progress": "#A76ACD",
		"surface-done": "#DCC1E9",
		"on-surface": "white",
	},
	dark: {
		background: "black",
		"on-background": "white",
		"surface-not-started": "green",
		"surface-in-progress": "yellow",
		"surface-done": "red",
		"on-surface": "white",
	},
}

/** @type Record<string,string> */
const initForLight = {}
/** @type Record<string,string> */
const initForDark = {}

module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				...reduce(
					colors.light,
					(acc, value, key) => {
						acc[key] = value
						return acc
					},
					initForLight,
				),
				...reduce(
					colors.dark,
					(acc, value, key) => {
						acc[`dark-${key}`] = value
						return acc
					},
					initForDark,
				),
				t: "red",
			},
			fontFamily: { "mono-base": "Iosevka" },
		},
	},
	plugins: [],
}
