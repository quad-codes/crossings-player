import { Analytics } from "./Analytics"
import { PropsWithChildren } from "react"
import { SafeAreaVars } from "./SafeAreaVars"

export function Providers({ children }: PropsWithChildren) {
	return (
		<Analytics>
			<SafeAreaVars>{children}</SafeAreaVars>
		</Analytics>
	)
}
