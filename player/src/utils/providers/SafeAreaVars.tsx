import { PropsWithChildren } from "react"
import { View } from "react-native"
// import { vars } from "nativewind"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export function SafeAreaVars({ children }: PropsWithChildren) {
	const saInsets = useSafeAreaInsets()

	const safeAreaVars = vars({
		"--safe-area-inset-top": saInsets.top,
		"--safe-area-inset-bottom": saInsets.bottom,
		"--safe-area-inset-left": saInsets.left,
		"--safe-area-inset-right": saInsets.right,
	})

	return (
		<View className="flex-1" style={safeAreaVars}>
			{children}
		</View>
	)
}
