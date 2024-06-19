import { PostHogProvider } from "posthog-react-native"
import { PropsWithChildren } from "react"

export function Analytics({ children }: PropsWithChildren) {
	return (
		<PostHogProvider
			apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
			options={{ host: "https://eu.i.posthog.com" }}
		>
			{children}
		</PostHogProvider>
	)
}
