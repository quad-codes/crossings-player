import { Stack } from "expo-router"
import { Providers } from "@/utils/providers"
import { LogBox } from "react-native"
import { tw } from "@/utils/twHelpers"
import { useDeviceContext } from "twrnc"

LogBox.ignoreLogs(["ExpandableCalendar"])

export default function RootLayout() {
	useDeviceContext(tw)

	return (
		<Providers>
			<Stack screenOptions={{ headerShown: false }} />
		</Providers>
	)
}
