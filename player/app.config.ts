import { ExpoConfig, ConfigContext } from "expo/config"
import v from "./version.json"
import loc from "./loc.json"

const IS_DEV = process.env.APP_VARIANT === "development"

const L = (process.env.L as "el" | "he") ?? "el"
const LID = loc[L].id

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: IS_DEV ? `${loc[L].appName} (DEV)` : loc[L].appName,
	slug: `crossings-${LID}`,
	scheme: `crossings-${LID}`,
	version: v.version,
	icon: `./assets/app-icon-${LID}.png`,
	ios: {
		bundleIdentifier: IS_DEV ? `codes.quad.crossings.${LID}.dev` : `codes.quad.crossings.${LID}`,
		buildNumber: String(v.build),
		config: { usesNonExemptEncryption: false },
	},
	android: {
		package: IS_DEV ? `codes.quad.crossings.${LID}.dev` : `codes.quad.crossings.${LID}`,
		versionCode: v.build,
	},
	userInterfaceStyle: "automatic",
	splash: {
		image: `./assets/splash-screen-${LID}.png`,
		backgroundColor: "#150050",
	},
	plugins: [
		"expo-router",
		"expo-localization",
		["expo-font", { fonts: ["./assets/fonts/Iosevka.ttf"] }],
	],

	extra: {
		eas: { projectId: loc[L].easProjectId },
		pvinis: { jsbuild: v.jsbuild },
	},

	runtimeVersion: { policy: "appVersion" },
	updates: { url: "https://u.expo.dev/99375595-9000-4912-bb9a-1258a6ed9c0f" },
})
