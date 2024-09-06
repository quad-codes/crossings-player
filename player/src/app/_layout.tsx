import "@/global.css"
import { AnimatedSplashScreen } from "@/components/SplashScreen"
import { useOTAUpdates } from "@/hooks/useOTAUpdates"
import { Providers } from "@/utils/providers"
import { Stack } from "expo-router"
import { LogBox, View } from "react-native"
import { useSafeAreaEnv } from "react-native-css-interop/dist/runtime/api"
import * as Sentry from "@sentry/react-native"

LogBox.ignoreLogs(["ExpandableCalendar"])

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	// debug: true,
})

export default function RootLayout() {
	useOTAUpdates()

	return (
		<View style={[{ flex: 1 }, useSafeAreaEnv()]}>
			<Providers>
				<Stack screenOptions={{ headerShown: false }} />
			</Providers>

			<AnimatedSplashScreen homeScreenReady allLoaded />
		</View>
	)
}
