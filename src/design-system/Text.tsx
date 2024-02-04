import { Text as RNText, TextProps } from "react-native"
import { twMerge } from "tailwind-merge"

export function Text({ children, className, ...restProps }: TextProps) {
	return (
		<RNText className={twMerge("text-on-background", className)} {...restProps}>
			{children}
		</RNText>
	)
}
