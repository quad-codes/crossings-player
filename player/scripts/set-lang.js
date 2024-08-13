#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const jq = require("node-jq")
const langConfig = require("../languages/config.json")

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

	fs.copyFileSync(
		path.join(__dirname, `../languages/translations/${lang}.json`),
		path.join(__dirname, "../assets/texts.json"),
	)

	const extraConfigJson = await jq.run(
		`.id = "${langConfig[lang].id}" |`
			+ `.appName = "${langConfig[lang].appName}" |`
			+ `.easProjectId = "${langConfig[lang].easProjectId}" |`
			+ `.slug = "crossings-${langConfig[lang].id}" |`
			+ `.scheme = "crossings-${langConfig[lang].id}" |`
			+ `.iosBundleIdentifier = "codes.quad.crossings.${langConfig[lang].id}" |`
			+ `.androidPackage = "codes.quad.crossings.${langConfig[lang].id}"`,
		path.join(__dirname, "../extraConfig.json"),
	)
	fs.writeFileSync(path.join(__dirname, "../extraConfig.json"), extraConfigJson)
}

;(async () => {
	await main()
})()

// emove

// export default ({ config }: ConfigContext): ExpoConfig => ({
// 	...config,

// 	name: IS_DEV ? `${extra.appName} (DEV)` : extra.appName,
// 	slug: `crossings-${LID}`,
// 	scheme: `crossings-${LID}`,
// 	version: v.version,
// 	icon: "./assets/app-icon.png",
// 	ios: {
// 		bundleIdentifier: IS_DEV ? `codes.quad.crossings.${LID}.dev` : `codes.quad.crossings.${LID}`,
// 		buildNumber: String(v.build),
// 		config: { usesNonExemptEncryption: false },
// 	},
// 	android: {
// 		package: IS_DEV ? `codes.quad.crossings.${LID}.dev` : `codes.quad.crossings.${LID}`,
// 		versionCode: v.build,
// 	},
