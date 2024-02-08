import { Letter } from "@/types"
import { Pressable, PressableProps, View } from "react-native"
import { Text } from "@/design-system/Text"
import { clsx } from "clsx"

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
				className={`flex-1 items-center justify-center border-hairline border-black ${bgColor} overflow-hidden`}
			>
				{guessWrong ? <View className="absolute h-[1px] w-[200px] -rotate-45 bg-red-500 " /> : null}
				<Text className="absolute left-0 top-0 text-on-grid-background">{spot}</Text>
				{letter === undefined ? (
					<View className="flex-1 bg-black" />
				) : (
					<Text
						className={clsx(
							"text-5xl leading-snug text-on-grid-background",
							guessCorrect && "text-on-grid-background-correct",
						)}
					>
						{guess?.toUpperCase()}
					</Text>
				)}
			</View>
		</Pressable>
	)
}
