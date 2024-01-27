import "ts-node/register" // this helps to import TypeScript files
import { ExpoConfig } from "expo/config"

const config: ExpoConfig = {
	name: "crossings",
	slug: "crossings",
	scheme: "crossings",
	ios: {
		bundleIdentifier: "is.pvin.crossings",
	},
	userInterfaceStyle: "automatic",
	plugins: [
		[
			"expo-router",
			{
				origin: "https://n",
			},
		],
	],
}
export default config
