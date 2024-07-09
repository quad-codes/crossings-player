import { DateString } from "@/types"
import { db } from "./db"

export async function getKremalaByDate(date: DateString) {
	let { data } = await db
		.from("kremalas")
		.select("id, date, word")
		.eq("date", date)
		.throwOnError()
		.single()
	return data
}
