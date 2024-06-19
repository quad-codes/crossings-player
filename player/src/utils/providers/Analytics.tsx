import PostHog, { PostHogProvider } from "posthog-react-native"
import { PropsWithChildren } from "react"

const client = new PostHog(process.env.EXPO_PUBLIC_POSTHOG_API_KEY, {
	host: "https://eu.i.posthog.com",
})

export function Analytics({ children }: PropsWithChildren) {
	return <PostHogProvider client={client}>{children}</PostHogProvider>
}
