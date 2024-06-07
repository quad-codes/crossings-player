import { type CrosserData } from "@/crossers/types"
import { atomWithMMKV } from "../utils/mmkvJotai"
import { type DateString } from "@/types"

export const crosserData = atomWithMMKV<Record<DateString, CrosserData>>("crossers", {})
