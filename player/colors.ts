type Colors = Record<
	| "background"
	| "on-background"
	| "surface-not-started"
	| "surface-in-progress"
	| "surface-done"
	| "on-surface",
	string
>

export const colors: Record<"light" | "dark", Colors> = {
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
