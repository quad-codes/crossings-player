import { range, reduce } from "lodash"
import { Tile } from "@/ui/Tile"
import { useState } from "react"
import { View, useWindowDimensions } from "react-native"
import { prepLettersGrid } from "@/utils/prepLettersGrid"
import { CrosserData } from "@/crossers/types"

interface CrosserProps {
	data: CrosserData
	highlightedRow: number | undefined
	highlightedCol: number | undefined
	setHighlightedRow: (row: number) => void
	setHighlightedCol: (col: number) => void
}

export function Crosser({
	data,
	highlightedRow,
	highlightedCol,
	setHighlightedRow,
	setHighlightedCol,
	guesses,
}: CrosserProps) {
	const { size, spots } = data
	const flippedSpots = reduce(spots, (acc, v, k) => ({ ...acc, [`${v.row}-${v.col}`]: k }), {})

	const { width } = useWindowDimensions()

	const cleanData = prepLettersGrid(data)
	const letters = cleanData.letters

	const [direction, setDirection] = useState<"across" | "down">("across")

	const onPress = (row: number, col: number) => {
		if (row === highlightedRow && col === highlightedCol) {
			setDirection(direction === "across" ? "down" : "across")
		}

		setHighlightedRow(row)
		setHighlightedCol(col)
	}

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
