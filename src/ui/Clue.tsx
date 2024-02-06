import { View } from "react-native"
import { Text } from "@/design-system/Text"
import { clueAtom } from "@/utils/crosserScreenAtoms"
import { useAtom } from "jotai"

interface ClueProps {}

export function Clue({}: ClueProps) {
	const [clue] = useAtom(clueAtom)

	return (
		<View className="bg-grid-extension h-[40px] items-center justify-center">
			<Text>{clue}</Text>
		</View>
	)
}
