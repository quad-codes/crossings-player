// import loc from "@/../languages/lang.json"
import Constants from "expo-constants"

type Language = "el" | "he"

// const L = (process.env.L ?? "el") as Language
// const LID = loc[L].id

// export function getLID() {
// 	return LID
// }

export function getLID(): Language {
	return (Constants.expoConfig?.extra?.pvinis?.lang ?? "el") as Language
}
