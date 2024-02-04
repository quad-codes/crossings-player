import { Letter } from "@/types"
import { Pressable, PressableProps, View } from "react-native"
import { Text } from "@/design-system/Text"

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
				? "bg-grid-background"
				: highlighted === 1
					? "bg-grid-extension"
					: "bg-grid-selection"

	const guessWrong = letter !== undefined && guess !== undefined && letter !== guess
	const guessCorrect = letter !== undefined && guess !== undefined && letter === guess

	return (
		<Pressable onPress={onPress} className="flex-1" disabled={letter === undefined}>
			<View
				className={`flex-1 items-center justify-center border-hairline border-black ${bgColor}`}
			>
				<Text className="text-on-grid-background absolute left-0 top-0">{spot}</Text>
				{letter === undefined ? (
					<View className="flex-1 bg-black" />
				) : (
					<Text
						className={`text-on-grid-background text-5xl ${guessCorrect ? "text-on-grid-background-correct" : ""}`}
					>
						{guess?.toUpperCase()}
					</Text>
				)}
				{guessWrong ? <View className="absolute h-[1px] w-[78px] -rotate-45 bg-red-500 " /> : null}
			</View>
		</Pressable>
	)
}

