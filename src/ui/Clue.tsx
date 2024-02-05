import { View } from "react-native"
import { Text } from "@/design-system/Text"

interface ClueProps {
	clue: string
}

export function Clue({ clue }: ClueProps) {
	return (
		<View className="bg-grid-extension h-[40px] items-center justify-center">
			<Text>{clue}</Text>
		</View>
	)
}
