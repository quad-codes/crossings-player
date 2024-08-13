import "@/global.css"
import { AnimatedSplashScreen } from "@/components/SplashScreen"
import { useOTAUpdates } from "@/hooks/useOTAUpdates"
import { Providers } from "@/utils/providers"
import { Stack } from "expo-router"
import { LogBox } from "react-native"
import * as Sentry from "@sentry/react-native"

LogBox.ignoreLogs(["ExpandableCalendar"])

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	// debug: true,
})

export default function RootLayout() {
	useOTAUpdates()

	return (
		<>
			<Providers>
				<Stack screenOptions={{ headerShown: false }} />
			</Providers>

			<AnimatedSplashScreen
				homeScreenReady={true}
				allLoaded={
					true
				}
			/>
		</>
	)
}
