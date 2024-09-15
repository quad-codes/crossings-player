import { ClassName, GameState } from "@/types"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { TouchableOpacity, View } from "react-native"
import { Text } from "./Text"
import { cn } from "@/utils/twHelpers"

interface GameProps extends ClassName {
	title: string
	subtitle?: string
	state: GameState
	onPress?: () => void
}

export function GameButton({ title, subtitle, state, onPress, className }: GameProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				className={cn(
					"h-28 w-auto flex-row items-center rounded-lg p-4",
					state === "not-started" && `bg-surface-not-started`,
					state === "in-progress" && `bg-surface-in-progress`,
					state === "done" && `bg-surface-done`,
					className,
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
				<Text className="ml-4 text-lg text-on-surface">{title}</Text>
				<Text className="ml-4 text-sm text-on-surface">{subtitle}</Text>
			</View>
		</TouchableOpacity>
	)
}