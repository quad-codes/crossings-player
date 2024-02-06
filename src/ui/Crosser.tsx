import { range, reduce } from "lodash"
import { Tile } from "@/ui/Tile"
import { View, useWindowDimensions } from "react-native"
import { prepLettersGrid, activeSpotForPosition } from "@/utils/crosserUtils"
import { CrosserData } from "@/crossers/types"
import { useAtom } from "jotai"
import {
	clueAtom,
	directionAtom,
	highlightedColAtom,
	highlightedRowAtom,
} from "@/utils/crosserScreenAtoms"
import { useEffect } from "react"

interface CrosserProps {
	data: CrosserData
}

export function Crosser({ data, guesses }: CrosserProps) {
	const [highlightedRow, setHighlightedRow] = useAtom(highlightedRowAtom)
	const [highlightedCol, setHighlightedCol] = useAtom(highlightedColAtom)
	const [, setClue] = useAtom(clueAtom)

	const { size, spots } = data
	const flippedSpots = reduce(spots, (acc, v, k) => ({ ...acc, [`${v.row}-${v.col}`]: k }), {})

	const { width } = useWindowDimensions()

	const cleanData = prepLettersGrid(data)
	const letters = cleanData.letters

	const [direction, setDirection] = useAtom(directionAtom)

	const onPress = (row: number, col: number) => {
		if (row === highlightedRow && col === highlightedCol) {
			setDirection(direction === "across" ? "down" : "across")
		}

		setHighlightedRow(row)
		setHighlightedCol(col)
	}

	useEffect(() => {
		const spot = activeSpotForPosition(data, highlightedRow, highlightedCol, direction)

		if (spot === null) return

		setClue(data[direction][spot].clue)
	}, [highlightedRow, highlightedCol, direction])

	return (
		<View className="border-2 border-black" style={{ width, height: width + 4 }}>
			{range(size[0]).map((_, i) => (
				<View key={i} className="flex-row" style={{ height: width / size[0] }}>
					{range(size[1]).map((_, j) => (
						<Tile
							key={j}
							letter={letters[`${i}-${j}`]}
							guess={guesses[`${i}-${j}`]}
							spot={flippedSpots[`${i}-${j}`]}
							highlighted={
								highlightedRow === i && highlightedCol === j
									? 2
									: direction === "across" && highlightedRow === i
										? 1
										: direction === "down" && highlightedCol === j
											? 1
											: 0
							}
							onPress={() => void onPress(i, j)}
						/>
					))}
				</View>
			))}
		</View>
	)
}
