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
					state === "not-started" && `bg-green-600`,
					state === "in-progress" && `bg-blue-600`,
					state === "done" && `bg-purple-700`,
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
				<Text style={tw`ml-4 text-lg text-white`}>{title}</Text>
			</View>
		</TouchableOpacity>
	)
}
