import { createClient, AnalyticsProvider } from "@segment/analytics-react-native"
import { PropsWithChildren } from "react"

const segmentClient = createClient({ writeKey: "SEGMENT_API_KEY" })

export function Providers({ children }: PropsWithChildren) {
	return <AnalyticsProvider client={segmentClient}>{children}</AnalyticsProvider>
}
