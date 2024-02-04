import "ts-node/register" // this helps to import TypeScript files
import { ExpoConfig } from "expo/config"

const config: ExpoConfig = {
	name: "crossings",
	slug: "crossings",
	scheme: "crossings",
	icon: "./assets/icon.png",
	ios: {
		bundleIdentifier: "is.pvin.crossings",
	},
	android: {
		package: "is.pvin.crossings",
	},
	userInterfaceStyle: "automatic",
	plugins: [["expo-router", { origin: "https://n" }]],
	extra: {
		eas: { projectId: "99375595-9000-4912-bb9a-1258a6ed9c0f" },
	},
}
export default config
