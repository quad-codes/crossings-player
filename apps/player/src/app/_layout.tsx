import { Slot } from "expo-router"
import { Providers } from "@/utils/providers"

export default function RootLayout() {
	return (
		<Providers>
			<Slot />
		</Providers>
	)
}
