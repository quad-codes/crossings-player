import { View } from "react-native"
import { WeekCalendar, CalendarProvider } from "react-native-calendars"
import { Text } from "@/design-system"
import { useQuery } from "@tanstack/react-query"
import CrosserIcon from "@@/assets/icons/crosser.svg"
import { tw } from "@/utils/twHelpers"
import { Game } from "@/components/Game"
import { useAnalytics } from "@/hooks/analytics"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Main() {
	const { capture } = useAnalytics()
	// const { isLoading, error, data } = useQuery({
	// 	queryKey: ["repoData"],
	// 	queryFn: async () => {
	// 		const response = await fetch(mapUrl)
	// 		if (!response.ok) throw new Error("Network response was not ok")
	// 		return response.json()
	// 	},
	// })

	// const dates = data ? Object.keys(data) : []

	return (
		<View style={tw`flex-1`}>
			<Text>Show all,a to go to list </Text>
			<CrosserIcon width={74} height={74} />
			<CalendarProvider date="2024-03-01">
				<WeekCalendar
					firstDay={1}
					// markedDates={marked.current}
				/>
				{/* <ExpandableCalendar
					firstDay={1}
				/> */}
				<View style={tw`px-4 pt-4`}>
					<Text>Games</Text>

					<View style={tw`flex-row justify-between p-4`}>
						<Game title="Stavrolekso" state="not-started" onPress={() => capture("game_tapped")} />
						<Game title="Kremala" state="done" />
					</View>
				</View>
			</CalendarProvider>
		</View>
	)
}
