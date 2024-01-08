import { Letter } from "@/types"
import { Pressable, PressableProps, Text, TextInput, View } from "react-native"

interface TileProps {
	letter: Letter | ""
	guess?: Letter
	highlighted?: 0 | 1 | 2
	onPress?: PressableProps["onPress"]
	spot?: string
}

export function Tile({ letter, guess, highlighted, onPress, spot }: TileProps) {
	const bgColor =
		letter === undefined
			? "bg-black"
			: highlighted === 0
			? "bg-white"
			: highlighted === 1
			? "bg-blue-200"
			: "bg-yellow-400"

	return (
		<Pressable onPress={onPress} className="flex-1" disabled={letter === undefined}>
			<View
				className={`flex-1 border-hairline border-black items-center justify-center ${bgColor}`}
			>
				<Text className="absolute top-0 left-0">{spot}</Text>
				{letter === undefined ? (
					<View className="flex-1 bg-black" />
				) : (
					<Text className="text-5xl">{guess?.toUpperCase()}</Text>
				)}
			</View>
		</Pressable>
	)
}

