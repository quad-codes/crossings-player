import { Pressable, View } from "react-native"
import { useAtom } from "jotai"
import { useMemo } from "react"
import { Text } from "@/design-system/Text"
import { clueAtom, directionAtom } from "@/utils/crosserScreenAtoms"

export function Clue() {
	// const [clue] = useAtom(clueAtom)
	const [, setDirection] = useAtom(directionAtom)

	const spots = useMemo(() => {
		return
	}, [])

	// const spot = activeSpotForPosition(data, highlightedRow, highlightedCol, direction)

	// if (spot === null) return

	// setClue(data[direction][spot].clue)

	return (
		<Pressable
			onPress={() => setDirection((d) => (d === "across" ? "down" : "across"))}
			className="bg-grid-extension"
		>
			<View className="h-[40px] items-center justify-center">
				<Text className="text-lg">{clue}</Text>
			</View>
		</Pressable>
	)
}
