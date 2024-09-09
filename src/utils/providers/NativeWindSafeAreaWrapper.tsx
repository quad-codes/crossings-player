import { PropsWithChildren } from "react"
import { useSafeAreaEnv } from "nativewind"
import { View } from "react-native"

export function NativeWindSafeAreaWrapper(props: PropsWithChildren) {
	return <View style={[{ flex: 1 }, useSafeAreaEnv()]} {...props} />
}
