import { Pressable, View } from "react-native"
import { Text } from "@/design-system/Text"
import { clueAtom, directionAtom } from "@/utils/crosserScreenAtoms"
import { useAtom } from "jotai"

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
