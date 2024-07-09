import { ExpoConfig, ConfigContext } from "expo/config"
import v from "./version.json"

const IS_DEV = process.env.APP_VARIANT === "development"

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: IS_DEV ? "Καθημερινά Παιχνίδια (DEV)" : "Καθημερινά Παιχνίδια",
	slug: "crossings",
	scheme: "crossings",
	version: v.version,
	icon: "./assets/app-icon.png",
	ios: {
		bundleIdentifier: IS_DEV ? "codes.quad.crossings.dev" : "codes.quad.crossings",
		buildNumber: String(v.build),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: IS_DEV ? "codes.quad.crossings.dev" : "codes.quad.crossings",
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
})
