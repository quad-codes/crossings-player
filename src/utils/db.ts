import "react-native-url-polyfill"
import type { Database } from "@/generated/database.types"
import { mmkvStorage } from "@/utils/mmkvStorage"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types"

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
