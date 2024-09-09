import { LetterGreek } from "./languages"

/** YYYY-MM-DD */
export type DateString = `${number}-${number}-${number}`

export type Direction = "across" | "down"

/** Unaccented Capital Letter */
export type Letter = LetterGreek

/** Unaccented Capital Letters */
export type Word = string & { _opaque: typeof NormalizedGreekString }
declare const NormalizedGreekString: unique symbol

export type Game = "hangman" | "crossword"

export type GameState = "not-started" | "in-progress" | "done"

export type KeyState = "off" | "correct"

export interface ClassName {
	className?: string
}
