import { tw } from "@/utils/twHelpers"
import { View, Text } from "react-native"

interface GameProps {
	title: string
	state: "not-started" | "in-progress" | "done"
}

export function Game({ title }: GameProps) {
	return (
		<View style={tw`w-32 items-center rounded-lg bg-purple-700 p-2`}>
			<Text style={tw`text-base text-white`}>{title}</Text>
		</View>
	)
}
