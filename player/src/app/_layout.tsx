import "../global.css"
import { Slot } from "expo-router"
import { Providers } from "@/utils/providers"
import { LogBox } from "react-native"

LogBox.ignoreLogs(["ExpandableCalendar"])

export default function RootLayout() {
	return (
		<Providers>
			<Slot />
		</Providers>
	)
}
