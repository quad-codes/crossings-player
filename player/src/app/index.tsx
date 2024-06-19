import { View } from "react-native"
import humanizeDuration from "humanize-duration"
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { Text, GameButton } from "@/design-system"
import CrosserIcon from "@@/assets/icons/crosser.svg"
import { tw } from "@/utils/twHelpers"
import useInterval from "react-use/lib/useInterval"
import { useAnalytics } from "@/hooks/analytics"
import { DateTime, Duration } from "luxon"
import { useAtom } from "jotai"
import { calendarDataAtom } from "@/atoms/storage"
import { every, reduce, set } from "lodash"
import { MarkedDates } from "react-native-calendars/src/types"
import { router } from "expo-router"
import { useState } from "react"
import { DateString } from "@/types"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Main() {
	const an = useAnalytics()

	// const { isLoading, error, data } = useQuery({
	// })

	const todayDT = DateTime.now()
	const tomorrowDT = todayDT.plus({ day: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
	const [remainingMillis, setRemainingMillis] = useState(0)

	useInterval(() => {
		setRemainingMillis(Math.trunc(tomorrowDT.diffNow().milliseconds))
	}, 1000)

	const today = todayDT.toFormat("yyyy-MM-dd") as DateString
	const [selectedDate, setSelectedDate] = useState(today)

	const [calendarData] = useAtom(calendarDataAtom)
	const markedDates = reduce(
		calendarData,
		(acc, value, key) => {
			if (value === undefined) return acc
			if (every(value, (v) => v === "not-started")) return acc

			acc[key] = {
				type: "dot",
				marked: true,
				dotColor: key === selectedDate ? "white" : "purple",
			}
			return acc
		},
		{} as MarkedDates,
	)

	return (
		<View style={tw`flex-1`}>
			<Text>Show all,a to go to list </Text>
			<CrosserIcon width={74} height={74} />
			<CalendarProvider
				date={selectedDate}
				onDateChanged={(date) => setSelectedDate(date as DateString)}
			>
				<ExpandableCalendar
					theme={{
						selectedDayBackgroundColor: "purple",
					}}
					firstDay={1}
					maxDate={today}
					markedDates={markedDates}
					closeOnDayPress={false}

				/>
				<View style={tw`px-4 pt-4`}>
					<Text style={tw`mb-4 text-4xl`}>Παιχνίδια</Text>

					<View>
						<Text style={tw`text-xl`}>Σήμερα: {selectedDate}</Text>
						{selectedDate === today && (
							<>
								<Text style={tw`mt-1`}>Τα επόμενα παιχνίδια θα εμφανιστούν σε:</Text>
								<Text style={tw`mt-1`}>
									{humanizeDuration(remainingMillis, { round: true, language: "el" })}
								</Text>
							</>
						)}

						<GameButton
							title="Κρεμάλα"
							state={calendarData[selectedDate]?.kremala ?? "not-started"}
							onPress={() => router.push(`kremala/2024-06-18`)}
							style={tw`mt-4`}
						/>
						<GameButton
							title="Σταυρόλεξο"
							state={calendarData[selectedDate]?.crossword ?? "not-started"}
							onPress={() => an.capture("game_tapped")}
							style={tw`mt-4`}
						/>
					</View>
				</View>
			</CalendarProvider>
		</View>
	)
}

/// A/B test for all buttons to be capital text?
