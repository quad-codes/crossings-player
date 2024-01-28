import { Letter } from "@/types"
import { Pressable, PressableProps, Text, View } from "react-native"

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
				className={`flex-1 items-center justify-center border-hairline border-black ${bgColor}`}
			>
				<Text className="absolute left-0 top-0">{spot}</Text>
				{letter === undefined ? (
					<View className="flex-1 bg-black" />
				) : (
					<Text className="text-5xl">{guess?.toUpperCase()}</Text>
				)}
			</View>
		</Pressable>
	)
}

