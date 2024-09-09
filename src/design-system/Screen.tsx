import { ClassName } from "@/types"
import { cn } from "@/utils/twHelpers"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { router } from "expo-router"
import { View } from "react-native"
import { PropsWithChildren } from "react"

export interface ScreenProps extends ClassName {
	back?: boolean
}

export function Screen({ back, children, className }: PropsWithChildren<ScreenProps>) {
	return (
		<View className={cn("flex-1 bg-background p-safe", className)}>
			{back && (
				<Icon
					name="chevron-left"
					size={32}
					className="text-on-background"
					onPress={() => router.back()}
				/>
			)}
			{children}
		</View>
	)
}
