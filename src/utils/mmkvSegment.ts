import { storage } from "./mmkvStorage"
import { Persistor } from "@segment/sovran-react-native"

const getItem: Persistor["get"] = async <T>(key: string) => {
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
