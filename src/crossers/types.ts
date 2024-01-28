export type CrosserData = {
	size: [number, number]
	spots: Record<string, { row: number; col: number }>
	across: Record<string, { answer: string; clue: string }>
	down: Record<string, { answer: string; clue: string }>
}
