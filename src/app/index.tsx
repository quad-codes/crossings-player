import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Link } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { Text } from "@/design-system/Text"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Page() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["repoData"],
		queryFn: async () => {
			const response = await fetch(mapUrl)
			if (!response.ok) throw new Error("Network response was not ok")
			return response.json()
		},
	})

	const dates = data && Object.keys(data)

	return (
		<View className="flex-1 bg-blue-400">
			<View className="mt-st flex-1">
				<FlashList
					data={dates}
					ListEmptyComponent={() => <Text>Loading..</Text>}
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
