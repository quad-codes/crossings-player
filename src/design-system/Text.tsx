import { Text as RNText, TextProps } from "react-native"
import { twMerge } from "tailwind-merge"

export function Text({ children, className, ...restProps }: TextProps) {
	return (
		<RNText className={twMerge("text-black dark:text-white", className)} {...restProps}>
			{children}
		</RNText>
	)
}
