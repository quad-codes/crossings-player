import { Providers } from "@/utils/Providers"
import * as Sentry from "@sentry/react-native"
import "../global.css"
import { Slot, useNavigationContainerRef } from "expo-router"
import { setup } from "@/utils/setup"
import { useEffect } from "react"

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()
setup({ routingInstrumentation })

function RootLayout() {
	const ref = useNavigationContainerRef()
	useEffect(() => {
		if (ref) routingInstrumentation.registerNavigationContainer(ref)
	}, [ref])

	return (
		<Providers>
			<Slot />
		</Providers>
	)
}

export default Sentry.wrap(RootLayout)
