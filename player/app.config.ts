import { ExpoConfig, ConfigContext } from "expo/config"
import v from "./version.json"
import extra from "./extraConfig.json"

const IS_DEV = process.env.APP_VARIANT === "development"

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: IS_DEV ? `${extra.appName} (DEV)` : extra.appName,
	slug: extra.slug,
	scheme: extra.scheme,
	version: v.version,
	icon: "./assets/app-icon.png",
	ios: {
		bundleIdentifier: extra.iosBundleIdentifier + (IS_DEV ? ".dev" : ""),
		buildNumber: String(v.build),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: extra.androidPackage + (IS_DEV ? ".dev" : ""),
		versionCode: v.build,
	},
	userInterfaceStyle: "automatic",
	splash: {
		image: "./assets/splash-screen.png",
		backgroundColor: "#150050",
	},
	plugins: [
		"expo-router",
		"expo-localization",
		["expo-font", { fonts: ["./assets/fonts/Iosevka.ttf"] }],
	],

	extra: {
		eas: { projectId: extra.easProjectId },
		pvinis: { lang: extra.id, jsbuild: v.jsbuild },
	},

	runtimeVersion: { policy: "appVersion" },
	updates: { url: "https://u.expo.dev/99375595-9000-4912-bb9a-1258a6ed9c0f" },
})
