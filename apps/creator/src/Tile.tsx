import { toUpper } from "lodash"
import { Label } from "./components/ui/label"
import { Coord, sameCol, sameRow } from "./cw-logic"
import { Input } from "./components/ui/input"
import { cn } from "./lib/utils"

export function Tile({
	cell,
	dead,
	spot,
	deadMode,
	setDeads,
	deads,
	letters,
	setLetters,
	nCols,
	nRows,
	selectedDirection,
	selectedCell,
	showSpots,
	setSelectedCell,
	inputRef,
	inputRefs,
}: {
	cell: Coord
	dead: boolean
	spot: Coord
	deadMode: boolean
	setDeads: (deads: string[]) => void
	deads: Coord[]
	letters: Record<string, string>
	setLetters: (letters: Record<string, string>) => void
	nCols: number
	nRows: number
	selectedDirection: "across" | "down"
	selectedCell: Coord
	showSpots: boolean
	setSelectedCell: (cell: Coord) => void
	inputRef: React.RefObject<HTMLInputElement>
	inputRefs: React.RefObject<React.RefObject<HTMLInputElement>[]>
}) {
	return (
		<div
			onClick={() => {
				if (!deadMode) return

				console.log("will black", cell)
				if (dead) {
					setDeads(deads.filter((d) => d !== cell))
				} else {
					setDeads([...deads, cell].sort())
				}
			}}
			className={cn(
				"relative size-14 border-2 border-black flex items-center justify-center",
				dead && "bg-black",
				((selectedDirection === "across" && sameRow(cell, selectedCell)) ||
					(selectedDirection === "down" && sameCol(cell, selectedCell))) &&
					"border-green-600",
				selectedCell === cell && "border-yellow-500",
			)}
		>
			{!dead && !deadMode && (
				<Input
					autoFocus={cell === "0-0"}
					ref={inputRef}
					type="text"
					className="size-10 text-center"
					maxLength={1}
					onFocus={(e) => {
						setSelectedCell(cell)
						e.target.select()
					}}
					value={letters[cell] || ""}
					onChange={(e) => {
						setLetters({
							...letters,
							[cell]: toUpper((e.nativeEvent.target as HTMLInputElement).value),
						})
						if ((e.nativeEvent.target as HTMLInputElement).value.length === 1) {
							const [r, c] = cell.split("-").map(Number)
							let index = r * nCols + c
							if (selectedDirection === "across") {
								index += 1
							} else {
								if (r === nRows - 1) {
									index = 0 * nCols + c + 1
								} else {
									index += nCols
								}
							}
							inputRefs.current![index].current!.focus()
						}
					}}
				/>
			)}
			{showSpots && (
				<div className="absolute top-0 left-0">
					<Label className="text-xs">{spot}</Label>
				</div>
			)}
		</div>
	)
}
