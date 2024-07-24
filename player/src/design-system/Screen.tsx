import { tw, tws } from "@/utils/twHelpers"
import { PropsWithChildren } from "react"
import { View, ViewStyle } from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { router } from "expo-router"

export interface ScreenProps {
	style?: ViewStyle
	back?: boolean
}

export function Screen({ back, children, style }: PropsWithChildren<ScreenProps>) {
	const saInsets = useSafeAreaInsets()

	return (
		<View
			style={tws(
				`flex-1 bg-background dark:bg-dark-background`,
				{ paddingTop: saInsets.top, paddingBottom: saInsets.bottom },
				style,
			)}
		>
			{back && (
				<Icon
					name="chevron-left"
					size={32}
					style={tw`text-on-background dark:text-dark-on-background`}
					onPress={() => router.back()}
				/>
			)}
			{children}
		</View>
	)
}
