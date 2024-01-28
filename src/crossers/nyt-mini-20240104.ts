import { CrosserData } from "./types"

export const nyt_mini_20240104: CrosserData = {
	size: [5, 5],
	spots: {
		1: { row: 0, col: 1 },
		2: { row: 0, col: 2 },
		3: { row: 0, col: 3 },
		4: { row: 0, col: 4 },
		5: { row: 1, col: 0 },
		6: { row: 2, col: 0 },
		7: { row: 3, col: 0 },
		8: { row: 4, col: 0 },
	},
	across: {
		1: { clue: `One might have the caption "That moment when ..."`, answer: "meme" },
		5: { clue: "Army rank above captain", answer: "major" },
		6: { clue: "Chicago's United Center, for one", answer: "arena" },
		7: { clue: `Annoy, with "off"`, answer: "tick" },
		8: { clue: "Hider of a bad haircut, perhaps", answer: "hat" },
	},
	down: {
		1: { clue: `"Ave ___" (song)`, answer: "maria" },
		2: { clue: "Pop out of a fighter plane", answer: "eject" },
		3: { clue: "TV detective played by Tony Shalhoub", answer: "monk" },
		4: { clue: "Section of history", answer: "era" },
		5: { clue: "It has its pluses and minuses", answer: "math" },
	},
}
