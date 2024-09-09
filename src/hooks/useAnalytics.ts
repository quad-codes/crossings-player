import { Game } from "@/types"
import { usePostHog } from "posthog-react-native"

export function useAnalytics() {
	const posthog = usePostHog()

	return {
		captureTimeliness: (timeliness: number, game: Game) =>
			posthog.capture("timeliness", { timeliness, game }),
	}
}
