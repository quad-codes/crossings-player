import { DateString } from "@/types"
import { round } from "lodash"
import { DateTime } from "luxon"

export function isToday(date: DateString): boolean {
	const today = DateTime.now().toFormat("yyyy-MM-dd") as DateString
	return date === today
}

export function diffFromToday(date: DateString): number {
	const today = DateTime.now()
	const dt = DateTime.fromFormat(date, "yyyy-MM-dd")
	const diff = dt.diff(today, "days").days
	return -round(diff)
}
