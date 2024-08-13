import { Text } from "@/design-system/Text"
import { LetterGreek, LetterHebrew } from "@/languages"
import { KeyState, Letter } from "@/types"
import { cn } from "@/utils/twHelpers"
import { Pressable, View } from "react-native"

export const BACKSPACE = "⌫"

interface KeyboardProps {
	onKeyPress: (key: Letter) => void
	noBackspace?: boolean
	keyStates?: Partial<Record<Letter, KeyState>>
}

export function Keyboard({ onKeyPress, noBackspace, keyStates }: KeyboardProps) {
	return (
		<View className="h-[180px] w-full justify-around">
			<View className="flex-row justify-center gap-[4px] px-4">
				{(["Ε", "Ρ", "Τ", "Υ", "Θ", "Ι", "Ο", "Π"] as Letter[]).map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} keyState={keyStates?.[c]} />
				))}
			</View>
			<View className="flex-row justify-center gap-[4px] px-4">
				{(["Α", "Σ", "Δ", "Φ", "Γ", "Η", "Ξ", "Κ", "Λ"] as Letter[]).map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} keyState={keyStates?.[c]} />
				))}
			</View>
			<View className="flex-row justify-center gap-[4px] px-4 pr-0">
				{(["Ζ", "Χ", "Ψ", "Ω", "Β", "Ν", "Μ"] as Letter[]).map((c) => (
					<Key key={c} character={c} onPress={() => onKeyPress(c)} keyState={keyStates?.[c]} />
				))}
				<View className="ml-2">
					<Key
						ghost={noBackspace}
						character={BACKSPACE}
						width="1.5u"
						onPress={() => onKeyPress(BACKSPACE)}
					/>
				</View>
			</View>
		</View>
	)
}

interface KeyProps {
	character: string
	width?: "1u" | "1.5u"
	onPress: () => void
	ghost?: boolean
	keyState?: KeyState
}

function Key({ character, width = "1u", onPress, ghost, keyState }: KeyProps) {
	const w = width === "1u" ? "w-[35px]" : "w-[50px]"

	if (ghost) {
		return <View className={cn(w, "h-[45px] items-center justify-center")} />
	}

	return (
		<Pressable onPress={onPress}>
			<View
				className={cn(
					w,
					"h-[45px] items-center justify-center rounded border border-on-background",
					keyState === "off" && `bg-gray-500`,
					keyState === "correct" && `bg-green-400`,
				)}
			>
				<Text className="text-2xl">{character.toUpperCase()}</Text>
			</View>
		</Pressable>
	)
}

const layouts: { el: LetterGreek[][]; he: LetterHebrew[][] } = {
	el: [
		["Ε", "Ρ", "Τ", "Υ", "Θ", "Ι", "Ο", "Π"],
		["Α", "Σ", "Δ", "Φ", "Γ", "Η", "Ξ", "Κ", "Λ"],
		["Ζ", "Χ", "Ψ", "Ω", "Β", "Ν", "Μ"],
	],
	he: [
		["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ"],
		["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף"],
		["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ"],
	],
}
