const { getSentryExpoConfig } = require("@sentry/react-native/metro")
const { withNativeWind } = require("nativewind/metro")

module.exports = (() => {
	let config = getSentryExpoConfig(__dirname)

	config = withNativeWind(config, { input: "./src/global.css", inlineRem: 16 })

	const { transformer, resolver } = config
	config.transformer = {
		...transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer"),
	}
	config.resolver = {
		...resolver,
		assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
		sourceExts: [...resolver.sourceExts, "svg"],
	}

	return config
})()
