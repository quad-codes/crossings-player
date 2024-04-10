import { range } from "lodash"

export type Coord = `${number}-${number}`

export function toCoord(row: number, col: number): Coord {
	return `${row}-${col}`
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
