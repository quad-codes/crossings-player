import { Stack } from "expo-router"
import { Providers } from "@/utils/providers"
import { LogBox } from "react-native"
import { tw } from "@/utils/twHelpers"
import { useDeviceContext } from "twrnc"
import { useOTAUpdates } from "@/hooks/useOTAUpdates"
import { AnimatedSplashScreen } from "@/components/SplashScreen"

LogBox.ignoreLogs(["ExpandableCalendar"])

export default function RootLayout() {
	useDeviceContext(tw)
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
