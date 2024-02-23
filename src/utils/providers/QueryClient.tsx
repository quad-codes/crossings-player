import { QueryClient as QueryClientOrig, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

const queryClient = new QueryClientOrig()

export function QueryClient({ children }: PropsWithChildren) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
