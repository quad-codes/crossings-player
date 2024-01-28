import { Link } from "expo-router"
import { View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Keyboard } from "@/ui/Keyboard"
import { useAnalytics } from "@segment/analytics-react-native"
import { Crosser } from "@/ui/Crosser"

export default function Page() {
	const { track } = useAnalytics()

	return (
		<View className="flex flex-1">
			<Header />
			<Crosser />

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
