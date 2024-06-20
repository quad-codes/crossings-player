export function normalizeGreek(text: string) {
	return text
		.replace(/Ά/g, "Α")
		.replace(/ά/g, "α")
		.replace(/Έ/g, "Ε")
		.replace(/έ/g, "ε")
		.replace(/Ή/g, "Η")
		.replace(/ή/g, "η")
		.replace(/Ί|Ϊ/g, "Ι")
		.replace(/ί|ΐ|ϊ/g, "ι")
		.replace(/Ό/g, "Ο")
		.replace(/ό/g, "ο")
		.replace(/Ύ|Ϋ/g, "Υ")
		.replace(/ύ|ΰ|ϋ/g, "υ")
		.replace(/Ώ/g, "Ω")
		.replace(/ώ/g, "ω")
		.replace(/ς/g, "σ")
}
