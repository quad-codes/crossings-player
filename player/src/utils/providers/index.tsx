import { PropsWithChildren } from "react"
import { Analytics } from "./Analytics"
import { QueryClient } from "./QueryClient"
// import { SafeAreaVars } from "./SafeAreaVars"

export function Providers({ children }: PropsWithChildren) {
	return (
		<Analytics>
			<QueryClient>
				{/* <SafeAreaVars> */}
				{/**/}
				{children}
				{/**/}
				{/* </SafeAreaVars> */}
			</QueryClient>
		</Analytics>
	)
}
