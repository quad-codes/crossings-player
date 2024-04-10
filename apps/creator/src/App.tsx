import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HJSON from "hjson"
import { range } from "lodash"
import { createRef, useRef, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./components/ui/label"
import { Coord, Direction, Path, gridExport, spotsCalc, toCoord } from "./cw-logic"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Tile } from "./Tile"

export function App() {
	const [nRows, setNRows] = useState(5)
	const [nCols, setNCols] = useState(5)
	const [blackMode, setBlackMode] = useState(false)
	const [showSpots, setShowSpots] = useState(true)
	const [debug, setDebug] = useState(false)
	const [deads, setDeads] = useState<Coord[]>([])

	const [selectedCell, setSelectedCell] = useState<Coord>("0-0")
	const [selectedDirection, setSelectedDirection] = useState<Direction>("across")
	const [letters, setLetters] = useState<Record<Coord, string>>({})
	const [clues, setClues] = useState<Record<Path, string>>({})
	const inputRefs = useRef([])

	// @ts-expect-error
	inputRefs.current = range(nRows * nCols).map(
		// @ts-expect-error
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
								// @ts-expect-error
								onChange={(e) => setNRows(e.nativeEvent.target!.value)}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="cols">Cols</Label>
							<Input
								type="number"
								id="cols"
								placeholder="Cols"
								value={nCols}
								// @ts-expect-error
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
							{range(nCols).map((j) => {
								const coords = toCoord(i, j)
								return (
									<Tile
										inputRef={inputRefs.current[i * nCols + j]}
										key={coords}
										nCols={nCols}
										cell={coords}
										dead={deads.includes(coords)}
										// @ts-expect-error
										spot={spots[coords]}
										blackMode={blackMode}
										nRows={nRows}
										// @ts-expect-error
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
								)
							})}
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
							// @ts-expect-error
							value={clues[`${spot}-accross`]}
							onChange={(e) =>
								setClues({
									...clues,
									[`${spot}-across`]: (e.nativeEvent.target as HTMLInputElement).value,
								})
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
							onChange={(e) => {
								if (e.nativeEvent.target) {
									setClues({
										...clues,
										[`${spot}-down`]: (e.nativeEvent.target as HTMLInputElement).value,
									})
								}
							}}
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
