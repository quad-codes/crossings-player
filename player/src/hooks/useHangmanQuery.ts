import { DateString } from "@/types"
import { getHangmanByDate } from "@/utils/dbQueries"
import { useQuery } from "@tanstack/react-query"

export function useHangmanQuery(date: DateString) {
	const queryHook = useQuery({
		queryKey: ["hangmanToday", date],
		queryFn: () => getHangmanByDate(date),
	})
	return queryHook
}
