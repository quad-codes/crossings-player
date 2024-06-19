import { View } from "react-native"
import { WeekCalendar, CalendarProvider } from "react-native-calendars"
import { Text, GameButton } from "@/design-system"
import { useQuery } from "@tanstack/react-query"
import CrosserIcon from "@@/assets/icons/crosser.svg"
import { tw } from "@/utils/twHelpers"
import { useAnalytics } from "@/hooks/analytics"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Main() {
	const an = useAnalytics()

	// const { isLoading, error, data } = useQuery({
	// 		return response.json()
	// 	},
	// })

	// const dates = data ? Object.keys(data) : []

	/// linear calendar for the 7 previous days!

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
						<GameButton
							title="Σταυρόλεξο"
							state="not-started"
							onPress={() => an.capture("game_tapped")}
						/>
						<GameButton title="Κρεμάλα" state="done" onPress={() => an.capture("test_event")} />
					</View>
				</View>
			</CalendarProvider>
		</View>
	)
}

/// A/B test for all buttons to be capital text?
