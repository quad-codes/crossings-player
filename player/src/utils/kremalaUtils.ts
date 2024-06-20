import { Word } from "@/types"
import { normalizeGreek } from "./normalizeGreek"

/** Unaccented capital letters */
export function createWord(str: string): Word {
	const newStr = normalizeGreek(str.toUpperCase())

	if (/^[Α-Ω]+$/.test(newStr)) return newStr as Word

	throw new Error(`Not a greek string!\n original: ${str}, normalized: ${newStr}`)
}
