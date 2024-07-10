import * as Updates from "expo-updates"
import useInterval from "react-use/lib/useInterval"

export function useOTAUpdates() {
	const shouldReceiveUpdates = Updates.isEnabled && !__DEV__

	// 	const appState = useAppState

	//   useInterval(() => {
	//     if (appState === "active" && needsUpdateCheck()) {
	//       checkForUpdate().then((reason) => setNoUpdateReason(reason))
	//     }
	//   }, monitorInterval / 4)
}
