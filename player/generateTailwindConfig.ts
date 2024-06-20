#!/usr/bin/env pnpx ts-node

import fs from "fs"
import { Config } from "tailwindcss"

type Colors = Record<"background" | "on-background", string>

const colors: Record<"light" | "dark", Colors> = {
	light: {
		background: "white",
		"on-background": "black",
	},
	dark: {
		background: "black",
		"on-background": "white",
	},
}

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				background: colors.light.background,
				"on-background": colors.light["on-background"],

				"dark-background": colors.dark.background,
				"dark-on-background": colors.dark["on-background"],

				t: "red",
			},
			fontFamily: {
				"mono-base": "Iosevka",
			},
		},
	},
	plugins: [],
}

fs.writeFileSync("tailwind.config.js", `module.exports = ${JSON.stringify(config)}`)
