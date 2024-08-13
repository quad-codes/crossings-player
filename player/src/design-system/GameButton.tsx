import { GameState } from "@/types"
import { tw, tws } from "@/utils/twHelpers"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "./Text"

interface GameProps {
	title: string
	subtitle?: string
	state: GameState
	onPress?: () => void
	style?: ViewStyle
}

export function GameButton({ title, subtitle, state, onPress, style }: GameProps) {
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
				<Text style={tw`ml-4 text-lg text-on-surface`}>{title}</Text>
				<Text style={tw`ml-4 text-sm text-on-surface`}>{subtitle}</Text>
			</View>
		</TouchableOpacity>
	)
}
