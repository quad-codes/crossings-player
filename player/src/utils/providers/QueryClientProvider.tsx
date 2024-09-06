import {
	QueryClient as QueryClientOrig,
	QueryClientProvider as QueryClientProviderOrig,
} from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClient = new QueryClientOrig()

export function QueryClientProvider(props: PropsWithChildren) {
	return <QueryClientProviderOrig client={queryClient} {...props} />
}
