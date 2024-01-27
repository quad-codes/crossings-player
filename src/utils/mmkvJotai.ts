import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { storage } from "./mmkvStorage"

function getItem<T>(key: string): T | undefined {
	const value = storage.getString(key)
	return value ? JSON.parse(value) : undefined
}

function setItem<T>(key: string, value: T): void {
	storage.set(key, JSON.stringify(value))
}

function removeItem(key: string): void {
	storage.delete(key)
}

function clearAll(): void {
	storage.clearAll()
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
	atomWithStorage<T>(
		key,
		initialValue,
		createJSONStorage<T>(() => ({
			getItem,
			setItem,
			removeItem,
			clearAll,
		}))
	)
