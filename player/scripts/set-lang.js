#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const validLanguages = ["el", "he"]

const lang = process.argv[2]
if (!validLanguages.includes(lang)) {
	console.error("Invalid language")
	process.exit(1)
}

fs.copyFileSync(
	path.join(__dirname, `../languages/assets/app-icon-${lang}.png`),
	path.join(__dirname, "../assets/app-icon.png"),
)

fs.copyFileSync(
	path.join(__dirname, `../languages/assets/splash-screen-${lang}.png`),
	path.join(__dirname, "../assets/splash-screen.png"),
)
