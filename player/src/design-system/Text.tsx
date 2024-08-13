import { ClassName } from "@/types"
import { cn } from "@/utils/twHelpers"
import { Text as RNText, TextProps as RNTextProps } from "react-native"

interface TextProps extends RNTextProps, ClassName {}

export function Text({ children, className, ...restProps }: TextProps) {
	return (
		<RNText {...restProps} className={cn("text-base text-on-background", className)}>
			{children}
		</RNText>
	)
}
