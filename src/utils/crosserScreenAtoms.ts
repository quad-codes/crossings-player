import { Direction } from "@/types"
import { atom } from "jotai"

export const directionAtom = atom<Direction>("across")
export const highlightedRowAtom = atom<number | undefined>(undefined)
export const highlightedColAtom = atom<number | undefined>(undefined)
export const clueAtom = atom("")
