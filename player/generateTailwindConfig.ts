#!/usr/bin/env pnpx ts-node

import fs from "fs"
import { Config } from "tailwindcss"
import { colors } from "./colors"
import { reduce } from "lodash"

const config: Config = {
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
					{} as Record<string, string>,
				),
				...reduce(
					colors.dark,
					(acc, value, key) => {
						acc[`dark-${key}`] = value
						return acc
					},
					{} as Record<string, string>,
				),
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
