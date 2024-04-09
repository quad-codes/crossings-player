import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Calendar, CalendarList, Agenda } from "react-native-calendars"
import { Link } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import Logo from "@@/assets/icons/crosser.svg"
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

	const dates = data ? Object.keys(data) : []

	return (
		<View className="flex-1 bg-blue-400">
			<View className="mt-st flex-1">
				<Text>Show all, to go to list </Text>

				<Calendar
					theme={{ calendarBackground: "transparent" }}
					firstDay={1}
					hideExtraDays
					displayLoadingIndicator={isLoading}
					markedDates={{ "2024-02-22": { disabled: true } }}
					dayComponent={({ date, state, marking, markingType, onPress }) => (
						<View
							className={clsx("items-center justify-center", state === "disabled" && "opacity-40")}
						>
							<View className="h-[30px] w-[30px] bg-red-400">
								<Logo height="100%" width="100%" />
							</View>
							<Text>{date?.day}</Text>
						</View>
					)}
					onDayPress={(day) => {
						console.log("selected day", day)
					}}
				/>
			</View>
		</View>
	)
}
