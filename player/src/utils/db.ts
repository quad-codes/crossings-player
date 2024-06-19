import "react-native-url-polyfill"
import { SupabaseClient, createClient } from "@supabase/supabase-js"
import { mmkvStorage } from "@/utils/mmkvStorage"
import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types"
import type { Database } from "@/generated/database.types"

const url = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const storage: SupabaseAuthClientOptions["storage"] = {
	getItem: (key) => mmkvStorage.getString(key)!,
	setItem: (key, value) => mmkvStorage.set(key, value),
	removeItem: (key) => mmkvStorage.delete(key),
}

export const db: SupabaseClient<Database> = createClient(url, anon, {
	auth: {
		storage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})
