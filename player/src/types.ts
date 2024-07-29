/** YYYY-MM-DD */
export type DateString = `${number}-${number}-${number}`

export type Direction = "across" | "down"

/** Unaccented Capital Letter */
export type Letter =
	| "Α"
	| "Β"
	| "Γ"
	| "Δ"
	| "Ε"
	| "Ζ"
	| "Η"
	| "Θ"
	| "Ι"
	| "Κ"
	| "Λ"
	| "Μ"
	| "Ν"
	| "Ξ"
	| "Ο"
	| "Π"
	| "Ρ"
	| "Σ"
	| "Τ"
	| "Υ"
	| "Φ"
	| "Χ"
	| "Ψ"
	| "Ω"

/** Unaccented Capital Letters */
export type Word = string & { _opaque: typeof NormalizedGreekString }
declare const NormalizedGreekString: unique symbol

export type Game = "hangman" | "crossword"

export type GameState = "not-started" | "in-progress" | "done"

export type KeyState = "off" | "correct"
