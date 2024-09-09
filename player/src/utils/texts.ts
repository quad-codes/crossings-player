import texts from "@/assets/texts.json"

export function t(key: keyof typeof texts): string {
	return texts[key]
}
