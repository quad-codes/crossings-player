import { Direction } from "@/types"
import { atom } from "jotai"

// export const crosserId = atom<string | undefined>(undefined)
// export const crosserData = atom(null)

export const directionAtom = atom<Direction>("across")
export const highlightedRowAtom = atom<number | null>(null)
export const highlightedColAtom = atom<number | null>(null)
export const clueAtom = atom("")

export const guessesAtom = atom<{ [key: string]: string }>({})
