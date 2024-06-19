declare module "*.svg" {
	import React from "react"
	import { SvgProps } from "react-native-svg"
	const content: React.FC<SvgProps>
	export default content
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EXPO_PUBLIC_POSTHOG_API_KEY: string
			EXPO_PUBLIC_SUPABASE_PROJECT_URL: string
			EXPO_PUBLIC_SUPABASE_ANON_KEY: string
		}
	}
}
export {}
