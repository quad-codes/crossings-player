import { DateString } from "@/types"
import { atom } from "jotai"
import { DateTime } from "luxon"

export const selectedDateAtom = atom(DateTime.now().toFormat("yyyy-MM-dd") as DateString)
