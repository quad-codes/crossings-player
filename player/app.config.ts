import { ConfigContext, ExpoConfig } from "expo/config"
import extra from "./extraConfig.json"

const IS_DEV = process.env.APP_VARIANT === "development"
const IS_DEVDEVICE = process.env.APP_VARIANT === "development-device"

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: extra.appName + (IS_DEV ? " (DEV)" : "") + (IS_DEVDEVICE ? " (DEVDEVICE)" : ""),
	slug: extra.slug,
	scheme: extra.scheme,
	version: "0.6.1",
	icon: "./assets/app-icon.png",
	ios: {
		bundleIdentifier:
			extra.iosBundleIdentifier + (IS_DEV ? ".dev" : "") + (IS_DEVDEVICE ? ".devdevice" : ""),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: extra.androidPackage + (IS_DEV ? ".dev" : "") + (IS_DEVDEVICE ? ".devdevice" : ""),
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
		[
			"@sentry/react-native/expo",
			{
				url: "https://sentry.io/",
				organization: "pvinis",
				project: "crossings",
			},
		],
	],

	extra: {
		eas: { projectId: extra.easProjectId },
		pvinis: { lang: extra.id, jsbuild: 9 },
	},

	runtimeVersion: {
		policy: "appVersion", // appVersion `1.2.3`, nativeVersion `1.2.3(29)`, fingerprint `magic`, custom `whatever-string-we-want`
	},
	updates: { url: "https://u.expo.dev/8503a5c0-0951-49df-81f7-cdd323478b0e" },
})
