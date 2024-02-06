import { Button, View, SafeAreaView } from "react-native"
import { Text } from "@/design-system/Text"
import { FlashList } from "@shopify/flash-list"
import * as Sentry from "@sentry/react-native"
import { Link } from "expo-router"

export default function Page() {
	return (
		<SafeAreaView className="bg-background flex flex-1">
			<FlashList
				data={["greek", "istavrolexo_5x5_20240204"]}
				estimatedItemSize={40}
				renderItem={({ item }) => (
					<Link href="/crosser/istavrolexo_5x5_20240204">
						<View>
							<Text className="text-4xl">{item}</Text>
							<Button
								title="Press me"
								onPress={() => {
									throw new Error("Hello, Sentry!")
								}}
							/>
							<Button title="Press me2" onPress={() => Sentry.nativeCrash()} />
						</View>
					</Link>
				)}
			/>
		</SafeAreaView>
	)
}
