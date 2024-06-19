export default function Page() {
	const { id } = useLocalSearchParams<{ id: string }>()
	// const { track } = useAnalytics()

	return (
		<View>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Text>Page {id}</Text>
			<Link href="..">Back</Link>
		</View>
	)
