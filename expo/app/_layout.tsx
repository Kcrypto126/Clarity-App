import "../global.css";

import { Slot } from "expo-router";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SupabaseProvider, useSupabase } from "@/context/supabase-provider";
import { Text } from "@/components/ui/text";

// Create a client
const queryClient = new QueryClient();

function RootLayoutNav() {
	const { onLayoutRootView } = useSupabase();

	return (
		<View className="flex-1 bg-background" onLayout={onLayoutRootView}>
			<Slot />
			<Text>Hello</Text>
		</View>
	);
}

export default function AppLayout() {
	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<SupabaseProvider>
					<RootLayoutNav />
				</SupabaseProvider>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}
