import { Alert, View } from "react-native"
import humanizeDuration from "humanize-duration"
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import v from "../../version.json"
import { Text, GameButton, Screen, Button } from "@/design-system"
import * as Application from "expo-application"
import * as Linking from "expo-linking"
import * as Notifications from "expo-notifications"
import { tw, tws } from "@/utils/twHelpers"
import * as Updates from "expo-updates"
import useInterval from "react-use/lib/useInterval"
import { DateTime } from "luxon"
import { useAtom } from "jotai"
import { calendarDataAtom, scheduledDailyNotifAtom } from "@/atoms/storage"
import { every, reduce } from "lodash"
import { MarkedDates } from "react-native-calendars/src/types"
import { router } from "expo-router"
import { useState } from "react"
import { DateString } from "@/types"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppColorScheme } from "twrnc"


export default function Index() {
	const saInsets = useSafeAreaInsets()
	const upd = Updates.useUpdates()
	const [theme] = useAppColorScheme(tw)

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

	// return <DebugSplashScreen />
	return (
		<Screen>
			<CalendarProvider
				date={selectedDate}
				onDateChanged={(date) => setSelectedDate(date as DateString)}
			>
				<ExpandableCalendar
					key={theme}
					allowShadow={false}
					theme={{
						selectedDayBackgroundColor: "purple",
						calendarBackground: tw`bg-background dark:bg-dark-background`.backgroundColor as string,
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
							style={tw`mt-4 opacity-30`}
						/>
					</View>
				</View>
			</CalendarProvider>

			<Text
				style={tws(`absolute right-4 text-on-background-low dark:text-dark-on-background-low`, {
					bottom: saInsets.bottom,
				})}
			>
				{upd.isUpdateAvailable ? "• " : ""}v{Application.nativeApplicationVersion} (
				{Application.nativeBuildVersion} - {v.jsbuild})
			</Text>
		</Screen>
	)
}

function DebugSplashScreen() {
	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text style={tw`mb-6 text-3xl font-bold text-black`}>Pretty Cool!</Text>
			<Button onPress={() => Updates.reloadAsync()}>Run Again</Button>
		</View>
	)
}
