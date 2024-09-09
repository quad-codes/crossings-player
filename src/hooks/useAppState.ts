import { useEffect, useRef } from "react"
import { AppState, AppStateStatus } from "react-native"

interface AppStateProps {
	onForeground?: () => void
	onBackground?: () => void
}

export function useAppState({ onForeground, onBackground }: AppStateProps) {
	const appState = useRef(AppState.currentState)

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			// app has come to the foreground
			if (
				(appState.current === "inactive" || appState.current === "background") &&
				nextAppState === "active"
			) {
				onForeground?.()
			}

			// app has gone to the background
			if (appState.current === "active" && nextAppState === "background") {
				onBackground?.()
			}

			appState.current = nextAppState
		}

		const sub = AppState.addEventListener("change", handleAppStateChange)

		return () => {
			sub.remove()
		}
	}, [appState.current, onForeground, onBackground])

	return { appState: appState.current }
}
