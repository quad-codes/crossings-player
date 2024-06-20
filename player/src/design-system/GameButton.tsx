import { tw, tws } from "@/utils/twHelpers"
import { View, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from "./Text"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { GameState } from "@/types"

interface GameProps {
	title: string
	state: GameState
	onPress?: () => void
	style?: ViewStyle
}

export function GameButton({ title, state, onPress, style }: GameProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={tws(
					`h-28 w-auto flex-row items-center rounded-lg p-4`,
					state === "not-started" && `bg-surface-not-started`,
					state === "in-progress" && `bg-surface-in-progress`,
					state === "done" && `bg-surface-done`,
					style,
				)}
			>
				<Icon
					name={
						state === "not-started"
							? "plus-circle-outline"
							: state === "in-progress"
								? "progress-check"
								: "check-circle-outline"
					}
					size={32}
					color="white"
				/>
				<Text style={tw`text-on-surface ml-4 text-lg`}>{title}</Text>
			</View>
		</TouchableOpacity>
	)
}
