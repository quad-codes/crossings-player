import { DateString, Game, GameState } from "@/types"
import { atomWithStorage } from "@/utils/atomWithStorage"
import { atom } from "jotai"

// export const crosserData = atomWithStorage<Record<DateString, CrosserData>>("crossers", {})

export const calendarDataAtom = atomWithStorage<
	Record<DateString, Partial<Record<Game, GameState>>>
>("calendarData", {
	"2024-06-14": { hangman: "done" },
	"2024-06-16": { crossword: "not-started" },
	"2024-06-18": { hangman: "in-progress", crossword: "done" },
	"2024-06-19": { hangman: "done" },
})

export const scheduledDailyNotifAtom = atomWithStorage("scheduledDailyNotif", false)

export const hangmanDataAtom = atomWithStorage<
	Record<DateString, { state: GameState; guesses: string[] }>
>("hangmanData", {
	"2024-06-20": {
		state: "in-progress",
		guesses: ["Η", "Θ", "Ι"],
	},
})
