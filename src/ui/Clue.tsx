import { Pressable, View } from "react-native"
import { useAtom } from "jotai"
import { useMemo } from "react"
import { Text } from "@/design-system/Text"
import { clueAtom, directionAtom } from "@/utils/crosserScreenAtoms"

interface ClueProps {}

export function Clue({}: ClueProps) {
	const [clue] = useAtom(clueAtom)
	const [, setDirection] = useAtom(directionAtom)

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
