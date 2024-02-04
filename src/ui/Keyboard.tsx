import { View, Pressable } from "react-native"
import { Text } from "@/design-system/Text"

export const BACKSPACE = "⌫"

interface KeyboardProps {
	onKeyPress: (key: string) => void
}

export function Keyboard({ onKeyPress }: KeyboardProps) {
	return (
		<View className="h-[180px] w-full justify-around">
			<View className="flex-row justify-center gap-[4px] px-4">
				{["ε", "ρ", "τ", "υ", "θ", "ι", "ο", "π"].map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} />
				))}
			</View>
			<View className="flex-row justify-center gap-[4px] px-4">
				{["α", "σ", "δ", "φ", "γ", "η", "ξ", "κ", "λ"].map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} />
				))}
			</View>
			<View className="flex-row justify-center gap-[4px] px-4 pr-0">
				{["ζ", "χ", "ψ", "ω", "β", "ν", "μ"].map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} />
				))}
				<View className="ml-2">
					<Key character={BACKSPACE} width="1.5u" onPress={() => onKeyPress(BACKSPACE)} />
				</View>
			</View>
		</View>
	)
}

interface KeyProps {
	character: string
	width?: "1u" | "1.5u"
	onPress: () => void
}

function Key({ character, width = "1u", onPress }: KeyProps) {
	const w = width === "1u" ? "w-[35px]" : "w-[50px]"
	return (
		<Pressable onPress={onPress}>
			<View
				className={`${w} border-on-background h-[45px] items-center justify-center rounded border`}
			>
				<Text className="text-2xl">{character.toUpperCase()}</Text>
			</View>
		</Pressable>
	)
}

