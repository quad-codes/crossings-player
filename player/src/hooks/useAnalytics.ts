import { usePostHog } from "posthog-react-native"

export function useAnalytics() {
	const posthog = usePostHog()
	return posthog
}
