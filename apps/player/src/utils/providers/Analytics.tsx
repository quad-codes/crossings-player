import { createClient, AnalyticsProvider } from "@segment/analytics-react-native"
import { PropsWithChildren } from "react"
import { Persistor } from "@segment/sovran-react-native"
import { mmkvStorage } from "../mmkvStorage"

const getItem: Persistor["get"] = async (key: string) => {
	const value = mmkvStorage.getString(key)
	return value ? JSON.parse(value) : undefined
}

const setItem: Persistor["set"] = async <T,>(key: string, state: T) => {
	mmkvStorage.set(key, JSON.stringify(state))
}

export const segmentPersistor: Persistor = {
	get: getItem,
	set: setItem,
}

const segmentClient = createClient({
	writeKey: process.env.EXPO_PUBLIC_SEGMENT_WRITE_KEY ?? "missing_key",
	trackAppLifecycleEvents: true,
	trackDeepLinks: true,
	storePersistor: segmentPersistor,
	debug: false, // dont generate logs
})

export function Analytics({ children }: PropsWithChildren) {
	return <AnalyticsProvider client={segmentClient}>{children}</AnalyticsProvider>
}
