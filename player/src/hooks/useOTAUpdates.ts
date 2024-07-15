import * as Updates from "expo-updates"
import { useEffect } from "react"

export function useOTAUpdates() {
	const shouldReceiveUpdates = Updates.isEnabled && !__DEV__

	useEffect(() => {
		if (!shouldReceiveUpdates) return

		onFetchUpdateAsync()
	}, [])
}

async function onFetchUpdateAsync() {
	try {
		const update = await Updates.checkForUpdateAsync()
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync()
			await Updates.reloadAsync()
		}
	} catch (e) {
		console.error("Error fetching update", e)
	}
}
