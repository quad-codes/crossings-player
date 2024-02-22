import { Providers } from "@/utils/providers"
import "../global.css"
import { Slot } from "expo-router"

export default function RootLayout() {
	return (
		<Providers>
			<Slot />
		</Providers>
	)
}
