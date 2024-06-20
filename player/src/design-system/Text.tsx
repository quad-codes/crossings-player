import { tw } from "@/utils/twHelpers"
import { Text as RNText, TextProps } from "react-native"

export function Text({ children, style, ...restProps }: TextProps) {
	return (
		<RNText
			{...restProps}
			style={[tw`dark:text-dark-on-background text-base text-on-background`, style]}
		>
			{children}
		</RNText>
	)
}
