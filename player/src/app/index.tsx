import { tw } from "@/utils/twHelpers"
import * as Updates from "expo-updates"
import { Button, Text, View } from "react-native"

export default function Index() {
	return <DebugSplashScreen />
}

function DebugSplashScreen() {
	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text style={tw`mb-6 text-3xl font-bold text-black`}>Pretty Cool!</Text>
			<Button title="Run Again" onPress={() => Updates.reloadAsync()} />
		</View>
	)
}
