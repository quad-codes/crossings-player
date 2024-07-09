import { DateString } from "@/types"
import { getKremalaByDate } from "@/utils/dbQueries"
import { useQuery } from "@tanstack/react-query"

export function useKremalaQuery(date: DateString) {
	const queryHook = useQuery({
		queryKey: ["kremalaToday", date],
		queryFn: () => getKremalaByDate(date),
	})
	return queryHook
}
