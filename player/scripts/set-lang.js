#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const jq = require("node-jq")

const validLanguages = ["el", "he"]

async function main() {
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

	await jq.run('.id = "wow"', path.join(__dirname, "../extraConfig.json"))
}

;(async () => {
	await main()
})()
