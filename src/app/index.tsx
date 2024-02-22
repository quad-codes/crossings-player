import { View } from "react-native"
import { Text } from "@/design-system/Text"
import { FlashList } from "@shopify/flash-list"
import { Link } from "expo-router"
import * as crossers from "@/crossers"

export default function Page() {
	return (
		<View className="flex-1 bg-blue-400">
			<View className="mt-st flex-1">
				<FlashList
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
		</View>
	)
}
