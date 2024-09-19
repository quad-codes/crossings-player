import { selectedDateAtom } from "@/atoms/session"
import Constants from "expo-constants"
import { calendarDataAtom } from "@/atoms/storage"
import { CountdownOrToday } from "@/components/CountdownOrToday"
import { Button, GameButton, Screen, Text } from "@/design-system"
import { DateString } from "@/types"
import { t } from "@/utils/texts"
import * as Application from "expo-application"
import { router } from "expo-router"
import * as Updates from "expo-updates"
import { useAtom } from "jotai"
import { every, reduce } from "lodash"
import { DateTime } from "luxon"
import { View } from "react-native"
import { CalendarProvider, ExpandableCalendar } from "react-native-calendars"
import { MarkedDates } from "react-native-calendars/src/types"
import { cssInterop, useColorScheme } from "nativewind"

const NWExpandableCalendar = cssInterop(ExpandableCalendar, {
	themeClassName: {
		target: false,
		nativeStyleToProp: {
			color: "theme",
		},
	},
})

export default function Index() {
	const upd = Updates.useUpdates()
	const { colorScheme } = useColorScheme()

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
				<NWExpandableCalendar
					key={colorScheme}
					allowShadow={false}
					themeClassName="{}-[theme.calendarBackground]:color-background {}-[theme.selectedDayBackgroundColor]:color-purple-500"
					firstDay={1}
					theme={{
						calendarBackground: "red",
					}}
					maxDate={today}
					markedDates={markedDates}
					closeOnDayPress={false}
				/>
				<View className="px-4 pt-4">
					<Text className="mb-4 text-4xl">{t("games")}</Text>

					<View>
						<CountdownOrToday />

						<GameButton
							title="Κρεμάλα"
							state={calendarData[selectedDate]?.hangman ?? "not-started"}
							onPress={() => router.push(`hangman/${selectedDate}`)}
							className="mt-4"
						/>
						<GameButton
							title="Σταυρόλεξοfaabbbbbb!!!!!--"
							subtitle="Έρχεται σύντομα"
							state={calendarData[selectedDate]?.crossword ?? "not-started"}
							// onPress={() => router.push(`crossword/${selectedDate}`)}
							className="mt-4 opacity-30"
						/>
					</View>
				</View>
			</CalendarProvider>

			<Text className="absolute right-4 bottom-safe">
				{upd.isUpdateAvailable ? "• " : ""}v{Application.nativeApplicationVersion} (
				{Application.nativeBuildVersion} - {Constants.expoConfig?.extra?.pvinis?.jsbuild})
			</Text>
		</Screen>
	)
}

function DebugSplashScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="mb-6 text-3xl font-bold text-black">Pretty Cool!</Text>
			<Button onPress={() => Updates.reloadAsync()}>Run Again</Button>
		</View>
	)
}
