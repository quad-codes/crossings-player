import { createClient, AnalyticsProvider } from "@segment/analytics-react-native"
import { PropsWithChildren } from "react"
import { segmentPersistor } from "./mmkvSegment"


const segmentClient = createClient({
	writeKey: process.env.EXPO_PUBLIC_SEGMENT_WRITE_KEY,
	trackAppLifecycleEvents: true,
	trackDeepLinks: true,
	storePersistor: segmentPersistor,
	debug: false, // dont generate logs
})

export function Providers({ children }: PropsWithChildren) {
	return <AnalyticsProvider client={segmentClient}>{children}</AnalyticsProvider>
}
