import { type CrosserData } from "@/crossers/types"
import { atomWithMMKV } from "./mmkvJotai"
import { type DateString } from "@/types"

export const crosserData = atomWithMMKV<Record<DateString, CrosserData>>("crossers", {})
