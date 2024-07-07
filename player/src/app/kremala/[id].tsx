import { Link, useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { filter, reduce, reject, uniq } from "lodash"
import { Button, Screen, Text } from "@/design-system"
import { getKremalaByDate } from "@/utils/dbQueries"
import type { DateString, KeyState, Letter } from "@/types"
import { tw } from "@/utils/twHelpers"
import { Keyboard } from "@/components/Keyboard"
import { useState } from "react"
import { normalizeGreek } from "@/utils/normalizeGreek"
import { createWord } from "@/utils/kremalaUtils"
import { isToday } from "@/utils/dateUtils"

const ERRORS_ALLOWED = 6

export default function Page() {

	const { isLoading, data } = useQuery({
		queryKey: ["kremalaToday", date],
		queryFn: () => getKremalaByDate(date),
	})

	const [guesses, setGuesses] = useState<Letter[]>([]) //// move to atom


	if (isLoading) {
		return (
			<View style={tw`flex-1 items-center justify-center`}>
				<Text>Loading...</Text>
			</View>
		)
	}

	if (!data) {
		return (
			<View style={tw`flex-1 items-center justify-center`}>
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

	return (
		<Screen>
			<View style={tw`flex-1 py-24`}>
				<Link href="..">Go back</Link>

				<Text>Λέξη για {isToday(date) ? "σήμερα" : date}</Text>

				<View style={tw`mt-8 flex-1 flex-row`}>
					{(word.split("") as Letter[]).map((letter, i) => (
						<Text key={i} style={tw`mx-0.5 font-mono-base text-2xl`}>
							{guesses.includes(normalizeGreek(letter)) ? letter : "_"}
						</Text>
					))}
				</View>
				<View style={tw`flex-1`}>
					<Text>Λάθη</Text>
					<View style={tw`flex-1 flex-row flex-wrap`}>
						<Text style={tw`font-mono-base text-2xl`}>{wrongGuessesDisplayed.join(" ")}</Text>
					</View>
				</View>

				<View style={tw`flex-1`} />
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
			{lost && (
				<View
					style={tw`absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-background opacity-90 dark:bg-dark-background`}
				>
					<Text style={tw`text-4xl`}>Δε το βρήκες σήμερα.</Text>
					<Text style={tw`text-2xl`}>Αλλά αυριο θα τα καταφέρεις!</Text>

					<Button href=".." style={tw`mt-24`}>
						Πίσω
					</Button>
				</View>
			)}
			{won && (
				<View
					style={tw`absolute bottom-0 left-0 right-0 top-0 items-center justify-center bg-background opacity-90 dark:bg-dark-background`}
				>
					<Text style={tw`text-4xl`}>Μπράβο!</Text>
					<Text style={tw`text-2xl`}>Το streak σου είναι 55.</Text>

					<Button href=".." style={tw`mt-24`}>
						Πίσω
					</Button>
				</View>
			)}
		</Screen>
	)

}
