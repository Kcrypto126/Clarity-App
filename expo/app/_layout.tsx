import "../global.css";

import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SupabaseProvider, useSupabase } from "@/context/supabase-provider";

// Create a client
const queryClient = new QueryClient();

function RootLayoutNav() {
	const { onLayoutRootView } = useSupabase();

	return (
		<View className="flex-1 bg-background" onLayout={onLayoutRootView}>
			<Slot />
		</View>
	);
}

export default function AppLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<SupabaseProvider>
				<RootLayoutNav />
			</SupabaseProvider>
		</QueryClientProvider>
	);
}
