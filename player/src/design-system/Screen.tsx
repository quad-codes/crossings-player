import { tws } from "@/utils/twHelpers"
import { PropsWithChildren } from "react"
import { View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface ScreenProps {
	style?: ViewStyle
}

export function Screen({ children, style }: PropsWithChildren<ScreenProps>) {
	const saInsets = useSafeAreaInsets()

	return (
		<View
			style={tws(
				`dark:bg-dark-background flex-1 bg-background`,
				{ paddingTop: saInsets.top, paddingBottom: saInsets.bottom },
				style,
			)}
		>
			{children}
		</View>
	)
}
