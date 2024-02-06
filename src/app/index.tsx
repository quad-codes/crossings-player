import { View } from "react-native"
import { Text } from "@/design-system/Text"
import { FlashList } from "@shopify/flash-list"
import { Link } from "expo-router"
import * as crossers from "@/crossers"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Page() {
	const saInsets = useSafeAreaInsets()

	return (
		<View className="flex flex-1 bg-green-400 ">
			<FlashList
				contentContainerStyle={{ paddingTop: saInsets.top, paddingBottom: saInsets.bottom }}
				data={Object.keys(crossers)}
				estimatedItemSize={40}
				renderItem={({ item }) => (
					<Link href={`/crosser/${item}`}>
						<View>
							<Text className="text-4xl">{item}</Text>
						</View>
					</Link>
				)}
			/>
		</View>
	)
}
