import PostHog, { PostHogProvider } from "posthog-react-native"
import { PropsWithChildren } from "react"
import { Platform } from "react-native"
import { modelName, osName, osVersion } from "expo-device"
import * as Application from "expo-application"
import v from "../../../version.json"

const client = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_API_KEY, {
	host: "https://eu.i.posthog.com",
})

client.register({
	platform: Platform.OS,
	os: osName,
	os_version: osVersion,
	device: modelName,
	is_dev: __DEV__,
	full_version: `${Application.nativeApplicationVersion} (${Application.nativeBuildVersion} - ${v.jsbuild})`,
})

export function Analytics({ children }: PropsWithChildren) {
	return <PostHogProvider client={client}>{children}</PostHogProvider>
}
