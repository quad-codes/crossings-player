import { Alert, View } from "react-native"
import humanizeDuration from "humanize-duration"
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { Text, GameButton, Screen, Button } from "@/design-system"
import * as Application from "expo-application"
import CrosserIcon from "@@/assets/icons/crosser.svg"
import * as Linking from "expo-linking"
import * as Notifications from "expo-notifications"
import { tw, tws } from "@/utils/twHelpers"
import useInterval from "react-use/lib/useInterval"
import { useAnalytics } from "@/hooks/analytics"
import { DateTime } from "luxon"
import { useAtom } from "jotai"
import { calendarDataAtom, scheduledDailyNotifAtom } from "@/atoms/storage"
import { every, reduce } from "lodash"
import { MarkedDates } from "react-native-calendars/src/types"
import { router } from "expo-router"
import { useState } from "react"
import { DateString } from "@/types"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const mapUrl = "https://raw.githubusercontent.com/pvinis/crossings-data/main/map.json"

export default function Main() {
	const [scheduledDailyNotif, setScheduledDailyNotif] = useAtom(scheduledDailyNotifAtom)

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

	const scheduleDailyNotif = async () => {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus

		if (existingStatus === "undetermined") {
			const { status: newStatus } = await Notifications.requestPermissionsAsync()
			finalStatus = newStatus
		}
		if (existingStatus === "denied") {
			Alert.alert(
				"Δεν μπορείς να λαμβάνεις ειδοποιήσεις",
				"Πήγαινε στις ρυθμίσεις της συσκευής σου και ενεργοποίησε τις ειδοποιήσεις για την εφαρμογή.",
				[{ text: "Ρυθμίσεις", onPress: () => Linking.openSettings() }, { text: "Άκυρο" }],
			)
		}

		if (finalStatus !== "granted") return

		Notifications.scheduleNotificationAsync({
			content: {
				title: "Let's go!",
				body: "Μόλις ανέβηκαν νέα παιχνίδια!",
			},
			trigger: {
				hour: 0,
				minute: 0,
				repeats: true,
			},
		})
		setScheduledDailyNotif(true)
	}

	return (
		<Screen>
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
								{!scheduledDailyNotif && (
									<Button small onPress={() => scheduleDailyNotif()}>
										Ενημέρωσέ με
									</Button>
								)}
							</>
						)}

						<GameButton
							title="Κρεμάλα"
							state={calendarData[selectedDate]?.kremala ?? "not-started"}
							onPress={() => router.push(`kremala/${selectedDate}`)}
							style={tw`mt-4`}
						/>
						<GameButton
							title="Σταυρόλεξο"
							subtitle="Έρχεται σύντομα"
							state={calendarData[selectedDate]?.crossword ?? "not-started"}
							// onPress={() => router.push(`crossword/${selectedDate}`)}
							style={tw`mt-4 opacity-30`}
						/>
					</View>
				</View>
			</CalendarProvider>

			<Text
				style={tws(`text-on-background-low dark:text-on-background-low absolute right-4`, {
					bottom: saInsets.bottom,
				})}
			>
				v{Application.nativeApplicationVersion} ({Application.nativeBuildVersion}) wow
			</Text>
		</Screen>
	)
}

/// A/B test for all buttons to be capital text?
