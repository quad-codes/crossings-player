import { createClient, AnalyticsProvider } from "@segment/analytics-react-native"
import { PropsWithChildren } from "react"


const segmentClient = createClient({
	writeKey: process.env.EXPO_PUBLIC_API_URL,
	trackAppLifecycleEvents: true,
	trackDeepLinks: true,
})

export function Providers({ children }: PropsWithChildren) {
	return <AnalyticsProvider client={segmentClient}>{children}</AnalyticsProvider>
}
