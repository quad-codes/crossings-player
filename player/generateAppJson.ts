#!/usr/bin/env pnpx ts-node

import fs from "fs"
import { ExpoConfig } from "expo/config"
import v from "./version.json"

const config: ExpoConfig = {
	name: "Σταυρόλεξο Τώρα",
	slug: "crossings",
	scheme: "crossings",
	version: v.version,
	icon: "./assets/app-icon.png",
	ios: {
		bundleIdentifier: "codes.quad.crossings",
		buildNumber: String(v.build),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: "codes.quad.crossings",
		versionCode: v.build,
	},
	userInterfaceStyle: "automatic",
	plugins: [
		"expo-router",
		"expo-localization",
		["expo-font", { fonts: ["./assets/fonts/Iosevka.ttf"] }],
	],

	extra: {
		eas: { projectId: "99375595-9000-4912-bb9a-1258a6ed9c0f" },
	},

	runtimeVersion: { policy: "appVersion" },
	updates: { url: "https://u.expo.dev/99375595-9000-4912-bb9a-1258a6ed9c0f" },
}

fs.writeFileSync("app.json", JSON.stringify({ expo: config }))
