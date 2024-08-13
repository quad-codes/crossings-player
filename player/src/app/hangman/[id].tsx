import { Keyboard } from "@/components/Keyboard"
import { Button, Screen, Text } from "@/design-system"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useHangmanQuery } from "@/hooks/useHangmanQuery"
import type { DateString, KeyState, Letter } from "@/types"
import { diffFromToday, isToday } from "@/utils/dateUtils"
import { createWord } from "@/utils/hangmanUtils"
import { normalizeGreek } from "@/utils/normalizeGreek"
import { useLocalSearchParams } from "expo-router"
import { filter, reduce, reject, uniq } from "lodash"
import { useEffect, useState } from "react"
import { View } from "react-native"
import Share from "react-native-share"

const ERRORS_ALLOWED = 6

export default function Page() {
	const { captureTimeliness } = useAnalytics()
	const { id: date = "1-2-3" } = useLocalSearchParams<{ id: DateString }>()

	const { isLoading, data } = useHangmanQuery(date)

	const [guesses, setGuesses] = useState<Letter[]>([]) //// move to atom

	useEffect(() => {
		const timeliness = diffFromToday(date)
		captureTimeliness(timeliness, "hangman")
	}, [date])

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Loading...</Text>
			</View>
		)
	}

	if (!data) {
		return (
			<View className="flex-1 items-center justify-center">
				<Text>Not found</Text>
			</View>
		)
	}

	const word = createWord(data.word)
	const correctGuesses: Letter[] = filter(guesses, (g) => word.includes(normalizeGreek(g)))
	const wrongGuesses: Letter[] = reject(guesses, (g) => word.includes(normalizeGreek(g)))

	const wrongGuessesDisplayed = [...wrongGuesses]
	if (wrongGuesses.length < ERRORS_ALLOWED) {
		wrongGuessesDisplayed.push(...Array(ERRORS_ALLOWED - wrongGuesses.length).fill("_"))
	}

	const lost = wrongGuesses.length >= ERRORS_ALLOWED
	const won = word.split("").every((l) => correctGuesses.includes(l))
	const finished = lost || won

	return (
		<Screen back>
			<View className="flex-1 py-24">
				<Text className="text-lg">Λέξη για {isToday(date) ? "σήμερα" : date}</Text>

				<View className="mt-8 flex-1 flex-row justify-center">
					{(word.split("") as Letter[]).map((letter, i) => (
						<Text key={i} className="mx-0.5 font-mono-base text-3xl">
							{guesses.includes(normalizeGreek(letter)) ? letter : "_"}
						</Text>
					))}
				</View>
				<View className="flex-1">
					<Text className="text-lg">Λάθη</Text>
					<View className="flex-1 flex-row flex-wrap">
						<Text className="font-mono-base text-3xl">{wrongGuessesDisplayed.join(" ")}</Text>
					</View>
				</View>

				<View className="flex-1" />
				<Keyboard
					noBackspace
					keyStates={{
						...reduce(
							correctGuesses,
							(acc, guess) => ({ ...acc, [guess]: "correct" }),
							{} as Record<Letter, KeyState>,
						),
						...reduce(
							wrongGuesses,
							(acc, guess) => ({ ...acc, [guess]: "off" }),
							{} as Record<Letter, KeyState>,
						),
					}}
					onKeyPress={(k) => setGuesses(uniq([...guesses, k]))}
				/>
			</View>

			{finished && (
				<View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-background opacity-90">
					{lost && (
						<>
							<Text className="text-4xl">Δε το βρήκες σήμερα.</Text>
							{/*  more texts for success anf failure */}
							<Text className="text-2xl">Αλλά αυριο θα τα καταφέρεις!</Text>
							<Text className="text-4xl">Η λέξη ήταν "{word}".</Text>
						</>
					)}
					{won && (
						<>
							<Text className="text-4xl">Μπράβο!</Text>
							<Text className="text-2xl">Το streak σου είναι 55.</Text>
						</>
					)}

					<Button
						onPress={() => {
							const sharedText = guesses
								.map((g, idx) => {
									if (idx === guesses.length - 1) return correctGuesses.includes(g) ? "✅" : "❌"
									return correctGuesses.includes(g) ? "🟩" : "🟥"
								})
								.join("")
							Share.open({
								message: `Κρεμαλα #${data.id}\n\n${sharedText}`,
								type: "text/plain",
							})
						}}
						className="mt-24"
					>
						Μοιράσου το
					</Button>

					<Button href=".." className="mt-12">
						Πίσω
					</Button>
				</View>
			)}
		</Screen>
	)
}

