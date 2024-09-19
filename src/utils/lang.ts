// import loc from "@/../languages/lang.json"
import { lang } from "@@/extra"

type Language = "el" | "he"

// const L = (process.env.L ?? "el") as Language
// const LID = loc[L].id

// export function getLID() {
// 	return LID
// }

export function getLID(): Language {
	return (lang ?? "el") as Language
}
