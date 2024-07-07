import { tw, tws } from "@/utils/twHelpers"
import { View, TouchableOpacity, ViewStyle } from "react-native"
import { Text } from "./Text"
import { PropsWithChildren } from "react"
import { router } from "expo-router"

interface ButtonProps {
	onPress?: () => void
	href?: string
	style?: ViewStyle
}

export function Button({ href, onPress, style, children }: PropsWithChildren<ButtonProps>) {
	return (
		<TouchableOpacity
			onPress={() => {
				if (href !== undefined) router.navigate(href)
				return onPress?.()
			}}
		>
			<View style={tws(`bg-primary items-center rounded-lg px-4 py-2`, style)}>
				<Text style={tw`text-on-primary text-lg`}>{children}</Text>
			</View>
		</TouchableOpacity>
	)
}
