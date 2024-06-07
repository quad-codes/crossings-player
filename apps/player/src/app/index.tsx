import { View, Text } from "react-native"
import { FlashList } from "@shopify/flash-list"
// import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import { Link } from "expo-router"
import { useQuery } from "@tanstack/react-query"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Main() {
	const saInsets = useSafeAreaInsets()

	const { isLoading, error, data } = useQuery({
		queryKey: ["repoData"],
		queryFn: async () => {
			const response = await fetch(mapUrl)
			if (!response.ok) throw new Error("Network response was not ok")
			return response.json()
		},
	})

	const dates = data ? Object.keys(data) : []

	return (
		<View
			style={tws(`m-safe flex-1 bg-blue-400`, {
				paddingTop: saInsets.top,
				paddingBottom: saInsets.bottom,
			})}
		>
			<View style={tw`mt-st flex-1`}>
				<Text>Show all, to go to list </Text>

				/> */}
			</View>
		</View>
	)
}
