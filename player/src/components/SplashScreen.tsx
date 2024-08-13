import { SplashScreen } from "expo-router"
import { useEffect, useState } from "react"
import { Image, View } from "react-native"
import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

SplashScreen.preventAutoHideAsync()

interface AnimatedSplashScreenProps {
	homeScreenReady: boolean
	allLoaded: boolean
}

export function AnimatedSplashScreen({ homeScreenReady, allLoaded }: AnimatedSplashScreenProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	const [splashAnimationCanStart, setSplashAnimationCanStart] = useState(false)
	const [splashAnimationDone, setSplashAnimationDone] = useState(false)

	useEffect(() => {
		if (!allLoaded) return
		if (!imageLoaded) return
		setSplashAnimationCanStart(true)
	}, [allLoaded, imageLoaded])

	useEffect(() => {
		const start = async () => {
			if (!splashAnimationCanStart) return
			await SplashScreen.hideAsync()
		}
		start()
	}, [splashAnimationCanStart])

	const animationCallback = () => {
		setSplashAnimationDone(true)
	}

	const progress = useSharedValue(0)
	const linearProgress = useSharedValue(0)
	useEffect(() => {
		if (!homeScreenReady) return
		progress.value = withTiming(1, { duration: 700, easing: Easing.cubic }, (finished) => {
			if (finished) runOnJS(animationCallback)()
		})
		linearProgress.value = withTiming(1, { duration: 500, easing: Easing.linear })
	}, [homeScreenReady])
	const zoomAnim = useAnimatedStyle(() => ({
		transform: [
			{ scale: interpolate(progress.value, [0, 1], [1, 30]) },
			{ translateY: interpolate(linearProgress.value, [0, 1], [0, -20]) },
		],
		opacity: interpolate(progress.value, [0, 1], [1, 0]),
	}))

	if (splashAnimationDone) return null

	return (
		<View className="absolute full">
			{!splashAnimationDone && (
				<Animated.View
					pointerEvents="none"
					className="items-center justify-center bg-transparent full"
				>
					<Image
						source={require("@/assets/splash-screen.png")}
						className="h-full w-full"
						onLoadEnd={() => setImageLoaded(true)}
					/>
				</Animated.View>
			)}
		</View>
	)
}
