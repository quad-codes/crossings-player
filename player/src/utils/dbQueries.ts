import { DateString } from "@/types"
import { db } from "./db"

export async function getKremalaByDate(date: DateString) {
	return db
		.from("kremalas")
		.select("date, word")
		.eq("date", date)
		.throwOnError()
		.single()
		.then((res) => res.data)
}
