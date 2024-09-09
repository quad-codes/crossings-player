import { atomWithStorage as atomWithStorageOrig, createJSONStorage } from "jotai/utils"
import { mmkvStorage } from "./mmkvStorage"

function getItem<T>(key: string): T | null {
	const value = mmkvStorage.getString(key)
	return value ? JSON.parse(value) : null
}

function setItem<T>(key: string, value: T): void {
	mmkvStorage.set(key, JSON.stringify(value))
}

function removeItem(key: string): void {
	mmkvStorage.delete(key)
}

function clearAll(): void {
	mmkvStorage.clearAll()
}

export const atomWithStorage = <T>(key: string, initialValue: T) =>
	atomWithStorageOrig<T>(
		key,
		initialValue,
		createJSONStorage<T>(() => ({
			getItem,
			setItem,
			removeItem,
			clearAll,
		})),
	)
