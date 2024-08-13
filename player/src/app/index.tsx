import { selectedDateAtom } from "@/atoms/session"
import { calendarDataAtom } from "@/atoms/storage"
import { CountdownOrToday } from "@/components/CountdownOrToday"
import { Button, GameButton, Screen, Text } from "@/design-system"
import { DateString } from "@/types"
import { t } from "@/utils/texts"
import { tw, tws } from "@/utils/twHelpers"
import * as Application from "expo-application"
import { router } from "expo-router"
import * as Updates from "expo-updates"
import { useAtom } from "jotai"
import { every, reduce } from "lodash"
import { DateTime } from "luxon"
import { View } from "react-native"
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { MarkedDates } from "react-native-calendars/src/types"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppColorScheme } from "twrnc"
import v from "../../version.json"


export default function Index() {
	const saInsets = useSafeAreaInsets()
	const upd = Updates.useUpdates()
	const [theme] = useAppColorScheme(tw)

	const todayDT = DateTime.now()

	const today = todayDT.toFormat("yyyy-MM-dd") as DateString
	const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)

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
					<Text style={tw`mb-4 text-4xl`}>{t("games")}</Text>

					<View>
						<CountdownOrToday />

						<GameButton
							title="Κρεμάλα"
							state={calendarData[selectedDate]?.hangman ?? "not-started"}
							onPress={() => router.push(`hangman/${selectedDate}`)}
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
