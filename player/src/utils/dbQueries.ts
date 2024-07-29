import { DateString } from "@/types"
import { db } from "./db"
import { getLID } from "./lang"

export async function getHangmanByDate(date: DateString) {
	let { data } = await db
		.from(`hangman-${getLID()}`)
		.select("id, date, word")
		.eq("date", date)
		.throwOnError()
		.single()
	return data
}
