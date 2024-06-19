import { tw } from "@/utils/twHelpers"
import { View, TouchableOpacity } from "react-native"
import { Text } from "./Text"

interface GameProps {
	title: string
	onPress?: () => void
}

export function GameButton({ title, state, onPress }: GameProps) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={tw`w-32 items-center rounded-lg bg-purple-700 p-2`}>
				<Text style={tw`text-white`}>{title}</Text>
			</View>
		</TouchableOpacity>
	)
}
