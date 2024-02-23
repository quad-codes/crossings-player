import { PropsWithChildren } from "react"
import { Analytics } from "./Analytics"
import { SafeAreaVars } from "./SafeAreaVars"
import { QueryClient } from "./QueryClient"

export function Providers({ children }: PropsWithChildren) {
	return (
		<Analytics>
			<QueryClient>
				<SafeAreaVars>{children}</SafeAreaVars>
			</QueryClient>
		</Analytics>
	)
}
