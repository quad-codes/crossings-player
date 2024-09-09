import { PropsWithChildren } from "react"
import { NativeWindSafeAreaWrapper } from "./NativeWindSafeAreaWrapper"
import { QueryClientProvider } from "./QueryClientProvider"
import { combineProviders } from "./combineProviders"
import { AnalyticsProvider } from "./AnalyticsProvider"

export function Providers({ children }: PropsWithChildren) {
	return combineProviders(
		[
			AnalyticsProvider,
			NativeWindSafeAreaWrapper, // below SafeAreaProvider (which comes with expo-router)
			QueryClientProvider,
		],
		children,
	)
}
