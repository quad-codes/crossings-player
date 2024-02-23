import { Persistor } from "@segment/sovran-react-native"
import { storage } from "./mmkvStorage"

const getItem: Persistor["get"] = async (key: string) => {
	const value = storage.getString(key)
	return value ? JSON.parse(value) : undefined
}

const setItem: Persistor["set"] = async <T>(key: string, state: T) => {
	storage.set(key, JSON.stringify(state))
}

export const segmentPersistor: Persistor = {
	get: getItem,
	set: setItem,
}
