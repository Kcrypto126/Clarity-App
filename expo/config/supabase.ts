import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import { Database } from "@/types/supabase/supabase";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_API_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string;

if (!supabaseUrl || !supabaseKey) {
	console.error("Missing Supabase configuration:", {
		hasUrl: !!supabaseUrl,
		hasKey: !!supabaseKey,
	});
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
