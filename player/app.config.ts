import { ConfigContext, ExpoConfig } from "expo/config"
import extraJson from "./extraConfig.json"
import packageJson from "./package.json"
import { coerce, major, minor, patch } from "semver"

const IS_DEV = process.env.APP_VARIANT === "development"
const IS_DEVDEVICE = process.env.APP_VARIANT === "development-device"

const appVersion = coerce(major(packageJson.version) + "." + minor(packageJson.version))?.version
const jsBuild = patch(packageJson.version)

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: extraJson.appName + (IS_DEV ? " (DEV)" : "") + (IS_DEVDEVICE ? " (DEVDEVICE)" : ""),
	slug: extraJson.slug,
	scheme: extraJson.scheme,
	version: appVersion,
	icon: "./assets/app-icon.png",
	ios: {
		bundleIdentifier:
			extraJson.iosBundleIdentifier + (IS_DEV ? ".dev" : "") + (IS_DEVDEVICE ? ".devdevice" : ""),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: extraJson.androidPackage + (IS_DEV ? ".dev" : "") + (IS_DEVDEVICE ? ".devdevice" : ""),
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
		eas: { projectId: extraJson.easProjectId },
		pvinis: {
			lang: extraJson.id,
			jsbuild: jsBuild,
		},
	},

	runtimeVersion: {
		policy: "appVersion", // appVersion `1.2.3`, nativeVersion `1.2.3(29)`, fingerprint `magic`, custom `whatever-string-we-want`
	},
	updates: { url: "https://u.expo.dev/8503a5c0-0951-49df-81f7-cdd323478b0e" },
})
