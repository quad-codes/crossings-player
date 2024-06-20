import { DateString } from "@/types"
import { DateTime } from "luxon"

export function isToday(date: DateString): boolean {
	const today = DateTime.now().toFormat("yyyy-MM-dd") as DateString
	return date === today
}
