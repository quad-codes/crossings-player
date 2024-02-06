import { Link, useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Keyboard } from "@/ui/Keyboard"
import { useAnalytics } from "@segment/analytics-react-native"
import { Crosser } from "@/ui/Crosser"
import { useState } from "react"
import { istavrolexo_5x5_20240204 } from "@/crossers/istavrolexo-5x5-20240204"
import { Clue } from "@/ui/Clue"
import { useAtom } from "jotai"
import {
	clueAtom,
	directionAtom,
	highlightedColAtom,
	highlightedRowAtom,
} from "@/utils/crosserScreenAtoms"
import { Text } from "@/design-system/Text"
import * as crossers from "@/crossers"

export default function Page() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { track } = useAnalytics()

	const crosserData = crossers[id]

	const [highlightedRow, setHighlightedRow] = useAtom(highlightedRowAtom)
	const [highlightedCol, setHighlightedCol] = useAtom(highlightedColAtom)
	const [guesses, setGuesses] = useState({})

	return (
		<View className="flex flex-1">
			<Header />
			<Crosser data={crosserData} guesses={guesses} />

			<View className="flex-1" />
			<SafeAreaView>
				<Clue />
				<Keyboard
					onKeyPress={(k) => {
						setGuesses({ ...guesses, [`${highlightedRow}-${highlightedCol}`]: k })
						track("key pressed", { k })
					}}
				/>
			</SafeAreaView>
		</View>
	)
}

function Header() {
	const { top } = useSafeAreaInsets()

	return (
		<View style={{ paddingTop: top }}>
			<View className="flex h-14 flex-row items-center justify-between px-4 lg:px-6 ">
				<Link className="flex-1 items-center justify-center font-bold" href="#">
					HOME
				</Link>
				<View className="flex flex-row gap-4 sm:gap-6">
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						Previous
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						Next
					</Link>
				</View>
			</View>
		</View>
	)
}
