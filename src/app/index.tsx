import { filter, forEach, map, range, reduce, set } from "lodash"
import { exampleCrosser } from "@/exampleCrosser"
import { Tile } from "@/ui/Tile"
import { Link } from "expo-router"
import { useState } from "react"
import { Text, TextInput, View, useWindowDimensions } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Letter } from "@/types"
import { prepLettersGrid } from "@/utils/prepLettersGrid"
import { Keyboard } from "@/ui/Keyboard"
import { useAnalytics } from "@segment/analytics-react-native"

export default function Page() {
	const { track } = useAnalytics()

	return (
		<View className="flex flex-1">
			<Header />
			<Crosser />
			{/* <TextInput
				className="border mt-4"
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect={false}
			/> */}

			<View className="flex-1" />
			<SafeAreaView className="w-full h-[180px] bg-gray-300 justify-around mb-safe">
				<Keyboard
					onKeyPress={(k) => {
						track("key pressed", { k })
						console.log(k)
					}}
				/>
			</SafeAreaView>
		</View>
	)
}

function Crosser() {
	const { size, spots } = exampleCrosser
	const flippedSpots = reduce(spots, (acc, v, k) => ({ ...acc, [`${v.row}-${v.col}`]: k }), {})

	const { width } = useWindowDimensions()

	const data = prepLettersGrid(exampleCrosser)
	const letters = data.letters
	const [guesses, setGuesses] = useState(data.letters)

	const [direction, setDirection] = useState<"across" | "down">("across")

	const [highlightedRow, setHighlightedRow] = useState<number | undefined>(undefined)
	const [highlightedCol, setHighlightedCol] = useState<number | undefined>(undefined)

	const onPress = (row: number, col: number) => {
		if (row === highlightedRow && col === highlightedCol) {
			setDirection(direction === "across" ? "down" : "across")
		}

		setHighlightedRow(row)
		setHighlightedCol(col)
	}

	return (
		<View className=" border-2 border-black" style={{ width, height: width + 4 }}>
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

function Header() {
	const { top } = useSafeAreaInsets()
	return (
		<View style={{ paddingTop: top }}>
			<View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
				<Link className="font-bold flex-1 items-center justify-center" href="#">
					ACME
				</Link>
				<View className="flex flex-row gap-4 sm:gap-6">
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						About
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						Product
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						Pricing
					</Link>
				</View>
			</View>
		</View>
	)
}
