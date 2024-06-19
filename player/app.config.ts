import "ts-node/register" // this helps to import TypeScript files
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
	plugins: [["expo-router", { origin: "https://n" }], "expo-localization"],

	extra: {
		eas: { projectId: "99375595-9000-4912-bb9a-1258a6ed9c0f" },
	},
}
export default config
