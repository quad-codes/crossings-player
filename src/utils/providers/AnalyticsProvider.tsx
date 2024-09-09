import * as Application from "expo-application"
import Constants from "expo-constants"
import { modelName, osName, osVersion } from "expo-device"
import PostHog, { PostHogProvider } from "posthog-react-native"
import { PropsWithChildren } from "react"
import { Platform } from "react-native"

const client = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_API_KEY, {
	host: "https://eu.i.posthog.com",
})

export function AnalyticsProvider(props: PropsWithChildren) {
	return (
		<PostHogProvider
			client={client}
			// debug
			{...props}
		/>
	)
}

client.register({
	platform: Platform.OS,
	os: osName,
	os_version: osVersion,
	device: modelName,
	is_dev: __DEV__,
	full_version: `${Application.nativeApplicationVersion} (${Application.nativeBuildVersion} - ${Constants.expoConfig?.extra?.pvinis?.jsbuild})`,
})
