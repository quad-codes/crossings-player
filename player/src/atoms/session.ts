import { atom } from "jotai"
import { DateTime } from "luxon"

export const selectedDateAtom = atom(DateTime.now())
