import { Link, useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Keyboard } from "@/ui/Keyboard"
import { useAnalytics } from "@segment/analytics-react-native"
import { Crosser } from "@/ui/Crosser"
import { useState } from "react"
import { Clue } from "@/ui/Clue"
import { useAtom } from "jotai"
import { highlightedColAtom, highlightedRowAtom } from "@/utils/crosserScreenAtoms"
import * as crossers from "@/crossers"

export default function Page() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { track } = useAnalytics()

	const crosserData = crossers[id]

	const [highlightedRow] = useAtom(highlightedRowAtom)
	const [highlightedCol] = useAtom(highlightedColAtom)
	const [guesses, setGuesses] = useState({})

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <Header /> */}
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
		</SafeAreaView>
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
						Piso
					</Link>
					<Link className="text-md font-medium hover:underline web:underline-offset-4" href="#">
						Next
					</Link>
				</View>
			</View>
		</View>
	)
}
