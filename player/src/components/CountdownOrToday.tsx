import { Alert, View } from "react-native"
import humanizeDuration from "humanize-duration"
import { Text, Button } from "@/design-system"
import * as Linking from "expo-linking"
import * as Notifications from "expo-notifications"
import { tw } from "@/utils/twHelpers"
import useInterval from "react-use/lib/useInterval"
import { DateTime } from "luxon"
import { useAtom } from "jotai"
import { scheduledDailyNotifAtom } from "@/atoms/storage"
import { useState } from "react"
import { getToday, isToday } from "@/utils/dateUtils"
import { selectedDateAtom } from "@/atoms/session"
import { useAppState } from "@/hooks/useAppState"

export function CountdownOrToday() {
	useAppState({
		onForeground: () => setSelectedDate(getToday()),
	})

	const [scheduledDailyNotif, setScheduledDailyNotif] = useAtom(scheduledDailyNotifAtom)

	const todayDT = DateTime.now()
	const tomorrowDT = todayDT.plus({ day: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
	const [remainingMillis, setRemainingMillis] = useState(0)

	useInterval(() => {
		setRemainingMillis(Math.trunc(tomorrowDT.diffNow().milliseconds))
	}, 1000)

	const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)

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
		<View style={tw`pt-4`}>
			<Text style={tw`text-xl`}>Σήμερα: {selectedDate}</Text>
			{isToday(selectedDate) ? (
				<>
					<Text style={tw`mt-1`}>Τα επόμενα παιχνίδια θα εμφανιστούν σε:</Text>
					<Text style={tw`mt-1`}>
						{humanizeDuration(remainingMillis, { round: true, language: "el" })}
					</Text>
					{!scheduledDailyNotif && (
						<Button small onPress={() => scheduleDailyNotif()} style={tw`mt-2`}>
							Ενημέρωσέ με
						</Button>
					)}
				</>
			) : (
				<Button small onPress={() => setSelectedDate(getToday())} style={tw`mt-2`}>
					Πήγαινε στα σημερινά
				</Button>
			)}
		</View>
	)
}
