import { forEach, range } from "lodash"
import { exampleCrosser } from "@/exampleCrosser"
import { Tile } from "@/ui/Tile"
import { Link } from "expo-router"
import { useState } from "react"
import { Text, View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Letter } from "@/types"
import { prepLettersGrid } from "@/utils/prepLettersGrid"

export default function Page() {
	return (
		<View className="flex flex-1">
			<Header />
			<Crosser />
		</View>
	)
}

function Crosser() {
	const { size } = exampleCrosser

	const data = prepLettersGrid(exampleCrosser)
	const letters = data.letters
	const [guesses, setGuesses] = useState(data.letters)

	const { width } = useWindowDimensions()

	return (
		<View className=" border-2 border-black" style={{ width, height: width + 4 }}>
			{range(size[0]).map((_, i) => (
				<View key={i} className="flex-row" style={{ height: width / size[0] }}>
					{range(size[1]).map((_, j) => (
						<Tile key={j} letter={letters[`${i}-${j}`]} guess={guesses[`${i}-${j}`]} />
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
