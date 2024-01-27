import { Providers } from "@/utils/Providers"
import "../global.css"
import { Slot } from "expo-router"

export default function Layout() {
	return (
		<Providers>
			<Slot />
		</Providers>
	)
}
