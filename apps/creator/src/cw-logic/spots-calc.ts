import { range } from "lodash"

export type Coord = `${number}-${number}`
export type Direction = "across" | "down"
export type Path = `${number}-${Direction}`

export function toCoord(row: number, col: number): Coord {
	return `${row}-${col}`
}

export function sameRow(coord1: Coord, coord2: Coord): boolean {
	return coord1.split("-")[0] === coord2.split("-")[0]
}

export function sameCol(coord1: Coord, coord2: Coord): boolean {
	return coord1.split("-")[1] === coord2.split("-")[1]
}

export function spotsCalc(nRows: number, nCols: number, deads: Coord[]): Record<Coord, number> {
	let spotNum = 1

	const spots: Record<Coord, number> = {}

	range(nRows).forEach((row) => {
		range(nCols).forEach((col) => {
			const coord = toCoord(row, col)

			if (deads.includes(coord)) return

			if (row === 0 || col === 0) {
				spots[coord] = spotNum++
				return
			}

			if (deads.includes(toCoord(row - 1, col)) || deads.includes(toCoord(row, col - 1))) {
				spots[coord] = spotNum++
				return
			}
		})
	})

	return spots
}

export function gridExport(nRows: number, nCols: number, letters: Record<Coord, string>): string {
	let grid = ""

	range(nRows).forEach((row) => {
		range(nCols).forEach((col) => {
			const coord = toCoord(row, col)

			if (!letters[coord]) {
				grid += "█"
				return
			}

			grid += letters[coord]
		})
		if (row === nRows - 1) return
		grid += "\n"
	})

	return grid

	// return reduce(
	// 	letters,
	// 	(acc, letter, coord) => {
	// 		const [row, col] = coord.split("-").map(Number)
	// 		return acc + (col === 0 ? "\n" : "") + (letter || ".")
	// 	},
	// 	"",
	// )
}
