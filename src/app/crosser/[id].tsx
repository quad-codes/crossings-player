import { Link, useLocalSearchParams } from "expo-router"
import { View, Text } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Keyboard } from "@/ui/Keyboard"
import { useAnalytics } from "@segment/analytics-react-native"
import { Crosser } from "@/ui/Crosser"
import { greek_7x7_20240108 } from "@/crossers"
import { useState } from "react"

export default function Page() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const { track } = useAnalytics()

	const crosserData = greek_7x7_20240108

	const [guesses, setGuesses] = useState({})

	return (
		<View className="flex flex-1">
			<Header />
			<Crosser data={crosserData} guesses={guesses} />

			<View className="flex-1" />
			<SafeAreaView className="mb-safe h-[180px] w-full justify-around bg-gray-300">
				<Keyboard
					onKeyPress={(k) => {
						setGuesses({ ...guesses, [`${0}-${0}`]: k })
						track("key pressed", { k })
						console.log(k)
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
