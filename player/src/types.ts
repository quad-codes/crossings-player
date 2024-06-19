/** YYYY-MM-DD */
export type DateString = `${number}-${number}-${number}`

export type Direction = "across" | "down"

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

export type Game = "kremala" | "crossword"

export type GameState = "not-started" | "in-progress" | "done"
