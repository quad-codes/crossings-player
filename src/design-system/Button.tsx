import { router } from "expo-router"
import { PropsWithChildren } from "react"
import { TouchableOpacity, View } from "react-native"
import { ClassName } from "@/types"
import { Text } from "./Text"
import { cn } from "@/utils/twHelpers"

interface ButtonProps extends ClassName {
	onPress?: () => void
	href?: string
	small?: boolean
}

export function Button({
	href,
	onPress,
	className,
	small,
	children,
}: PropsWithChildren<ButtonProps>) {
	return (
		<TouchableOpacity
			onPress={() => {
				if (href !== undefined) router.navigate(href)
				return onPress?.()
			}}
		>
			<View className={cn("items-center rounded-lg bg-primary px-4 py-2", className)}>
				<Text className={cn("text-lg text-on-primary", small && "text-sm")}>{children}</Text>
			</View>
		</TouchableOpacity>
	)
}
