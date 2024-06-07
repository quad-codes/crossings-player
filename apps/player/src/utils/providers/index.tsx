import { PropsWithChildren } from "react"
import { Analytics } from "./Analytics"
import { QueryClient } from "./QueryClient"

export function Providers({ children }: PropsWithChildren) {
	return (
		<Analytics>
			<QueryClient>
				{/**/}
				{children}
				{/**/}
			</QueryClient>
		</Analytics>
	)
}
