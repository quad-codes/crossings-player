import { Link, useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"
import { useAnalytics } from "@segment/analytics-react-native"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { Keyboard } from "@/ui/Keyboard"
import { Crosser } from "@/ui/Crosser"
import {
	guessesAtom,
	highlightedColAtom,
	highlightedRowAtom,
	directionAtom,
} from "@/utils/crosserScreenAtoms"
import { Clue } from "@/ui/Clue"

export default function Page() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { track } = useAnalytics()

	const crosserData = crossers[id]

	const [highlightedRow, setHighlightedRow] = useAtom(highlightedRowAtom)
	const [highlightedCol, setHighlightedCol] = useAtom(highlightedColAtom)
	const [direction] = useAtom(directionAtom)
	const [guesses, setGuesses] = useAtom(guessesAtom)

	// useEffect(() => {
	// 	if (guesses[`${highlightedRow}-${highlightedCol}`] !== undefined) {
	// 		if (direction === "across") {
	// 			const nextCol = highlightedCol + 1
	// 			if (nextCol < crosserData.size[1]) {
	// 				setHighlightedCol(nextCol)
	// 			} else if (highlightedRow + 1 < crosserData.size[0]) {
	// 				setHighlightedRow(highlightedRow + 1)
	// 				setHighlightedCol(0)
	// 			}
	// 		} else {
	// 			setHighlightedRow(highlightedRow + 1)
	// 		}
	// 	}
	// }, [guesses, highlightedRow, highlightedCol])

	return (
		<View className="mb-sb mt-st flex-1">
			<Header />
			<ScrollView className="flex-1">
				<Crosser data={crosserData} guesses={guesses} />
			</ScrollView>

			<Clue />
			<Keyboard
				onKeyPress={(k) => {
					setGuesses({ ...guesses, [`${highlightedRow}-${highlightedCol}`]: k })
					track("key pressed", { k })
				}}
			/>
		</View>
	)
}

function Header() {
	return (
		<View className="h-10 flex-row items-center justify-between px-4 lg:px-6 ">
			<Link className="flex-1 items-center justify-center font-bold" href="#">
				Arxiki
			</Link>
			<View className="flex flex-row gap-4 sm:gap-6">
				<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
					Piso
				</Link>
				<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
					Epomeno
				</Link>
			</View>
		</View>
	)
}
