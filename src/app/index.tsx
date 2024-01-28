import { View, Text } from "react-native"
import { FlashList } from "@shopify/flash-list"

export default function Page() {
	return (
		<FlashList
			style={{ flex: 1 }}
			data={["greek"]}
			renderItem={({ item }) => (
				<View>
					<Text>{item}</Text>
				</View>
			)}
		/>
	)
}
