import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HJSON from "hjson"
import { range, reduce, toUpper } from "lodash"
import { createRef, useRef, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./components/ui/label"
import { Coord, Direction, Path, gridExport, sameCol, sameRow, spotsCalc } from "./cw-logic"
import { Input } from "./components/ui/input"
import { cn } from "./lib/utils"
import { Button } from "./components/ui/button"

function Tile({
	cell,
	dead,
	spot,
	blackMode,
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
}) {
	return (
		<div
			onClick={() => {
				if (!blackMode) return

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
			{!dead && !blackMode && (
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
						setLetters({ ...letters, [cell]: toUpper(e.nativeEvent.target.value) })
						if (e.nativeEvent.target.value.length === 1) {
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
							inputRefs.current[index].current.focus()
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

export function App() {
	const [nRows, setNRows] = useState(5)
	const [nCols, setNCols] = useState(5)
	const [blackMode, setBlackMode] = useState(false)
	const [showSpots, setShowSpots] = useState(true)
	const [debug, setDebug] = useState(false)
	const [deads, setDeads] = useState([])

	const [selectedCell, setSelectedCell] = useState<Coord>("0-0")
	const [selectedDirection, setSelectedDirection] = useState<Direction>("across")
	const [url, setUrl] = useState(null)
	const [letters, setLetters] = useState<Record<Coord, string>>({})
	const [clues, setClues] = useState<Record<Path, string>>({})
	const inputRefs = useRef([])
	inputRefs.current = range(nRows * nCols).map(
		(ref, index) => (inputRefs.current[index] = createRef()),
	)

	const spots = spotsCalc(nRows, nCols, deads)

	return (
		<div className="flex">
			<div className="flex flex-col flex-1">
				<h1>Creator</h1>
				<div>
					<div className="flex">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="rows">Rows</Label>
							<Input
								type="number"
								id="rows"
								placeholder="Rows"
								value={nRows}
								onChange={(e) => setNRows(e.nativeEvent.target.value)}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="cols">Cols</Label>
							<Input
								type="number"
								id="cols"
								placeholder="Cols"
								value={nCols}
								onChange={(e) => setNCols(e.nativeEvent.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center  space-x-2">
						<Checkbox checked={blackMode} onCheckedChange={(v) => setBlackMode(!!v)} />
						<Label>black mode</Label>
					</div>

					<Tabs defaultValue="across" className="w-[400px]">
						<TabsList>
							<TabsTrigger value="across" onClick={() => setSelectedDirection("across")}>
								Across
							</TabsTrigger>
							<TabsTrigger value="down" onClick={() => setSelectedDirection("down")}>
								Down
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex-col flex">
					{range(nRows).map((i) => (
						<div className="flex flex-row" key={`${i}`}>
							{range(nCols).map((j) => (
								<Tile
									inputRef={inputRefs.current[i * nCols + j]}
									key={`${i}-${j}`}
									nCols={nCols}
									cell={`${i}-${j}`}
									dead={deads.includes(`${i}-${j}`)}
									spot={spots[`${i}-${j}`]}
									blackMode={blackMode}
									nRows={nRows}
									setDeads={setDeads}
									deads={deads}
									letters={letters}
									setLetters={setLetters}
									selectedDirection={selectedDirection}
									selectedCell={selectedCell}
									showSpots={showSpots}
									setSelectedCell={setSelectedCell}
									inputRefs={inputRefs}
								/>
							))}
						</div>
					))}
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox checked={showSpots} onCheckedChange={(v) => setShowSpots(!!v)} />
					<Label>show spots</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox checked={debug} onCheckedChange={(v) => setDebug(!!v)} id="debug" />
					<Label htmlFor="debug">debug</Label>
				</div>
				{debug && (
					<div className="flex flex-col">
						<code>
							size: {nRows}x{nCols}
						</code>
						<code>dead: {deads.join(", ")}</code>
						<code>letters: {HJSON.stringify({ grid: gridExport(nRows, nCols, letters) })}</code>
						<code>clues: {JSON.stringify(clues)}</code>
					</div>
				)}

				<Button
					onClick={() => {
						const blob = new Blob(
							[
								HJSON.stringify(
									{
										version: "1.0",
										author: "Mixalis",
										grid: gridExport(nRows, nCols, letters),
										clues,
									},
									{ bracesSameLine: true },
								),
							],
							{
								type: "application/hjson",
							},
						)
						const url = URL.createObjectURL(blob)
						fetch(url)
							.then((res) => res.blob())
							.then((blob) => {
								const url = window.URL.createObjectURL(new Blob([blob]))
								const link = document.createElement("a")
								link.href = url
								link.download = "crossword.hjson"
								document.body.appendChild(link)
								link.click()
								document.body.removeChild(link)
								window.URL.revokeObjectURL(url)
							})
					}}
				>
					Export file
				</Button>
			</div>

			<div className="h-auto w-0.5	 bg-black mx-2" />

			<div className="flex flex-col w-1/3">
				<h1>Clues</h1>
				<h2>Across</h2>
				{Object.entries(spots).map(([_, spot]) => (
					<div
						key={`${spot}-across`}
						className="flex flex-row items-start justify-center space-x-2"
					>
						<Label>{spot}</Label>
						<Input
							type="text"
							value={clues[`${spot}-accross`]}
							onChange={(e) =>
								setClues({ ...clues, [`${spot}-across`]: e.nativeEvent.target.value })
							}
						/>
					</div>
				))}
				<h2>Down</h2>
				{Object.entries(spots).map(([_, spot]) => (
					<div key={`${spot}-down`} className="flex flex-row items-center justify-center space-x-2">
						<Label>{spot}</Label>
						<Input
							type="text"
							value={clues[`${spot}-down`]}
							onChange={(e) => setClues({ ...clues, [`${spot}-down`]: e.nativeEvent.target.value })}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

// add author inputfield

/// add some checks before exporting
// check if all cells are filled
// check if all clues are filled
