import { Letter } from "@/types"
import { Text, View } from "react-native"

interface TileProps {
	letter: Letter | ""
	guess?: Letter
}

export function Tile({ letter, guess }: TileProps) {
	if (letter === undefined) {
		return <View className="flex-1 border-2 bg-black" />
	}

	return (
		<View className="flex-1 border border-black items-center justify-center">
			<Text className="text-5xl">{guess?.toUpperCase()}</Text>
		</View>
	)
}
