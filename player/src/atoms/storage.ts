import { Game, GameState, DateString } from "@/types"
import { atomWithStorage } from "@/utils/atomWithStorage"

export const calendarDataAtom = atomWithStorage<
	Record<DateString, Partial<Record<Game, GameState>>>
>("calendarData", {
	"2024-06-14": { kremala: "done" },
	"2024-06-16": { crossword: "not-started" },
	"2024-06-18": { kremala: "in-progress", crossword: "done" },
	"2024-06-19": { kremala: "done" },
})

export const scheduledDailyNotifAtom = atomWithStorage("scheduledDailyNotif", false)
