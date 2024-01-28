import { View, Text, TouchableHighlight, SafeAreaView } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Link } from "expo-router"

export default function Page() {
	return (
		<SafeAreaView className="flex flex-1 ">
			<FlashList
				style={{ flex: 1, backgroundColor: "red" }}
				data={["greek"]}
				estimatedItemSize={40}
				renderItem={({ item }) => (
					<Link href="/crosser/greek">
						<View>
							<Text>{item}</Text>
						</View>
					</Link>
				)}
			/>
		</SafeAreaView>
	)
}
