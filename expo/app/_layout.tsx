import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { Text, View } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SupabaseProvider } from "@/context/supabase-provider";
import { useSupabase } from "@/context/supabase-provider";

// Create a client
const queryClient = new QueryClient();

function RootLayout() {
  const { onLayoutRootView } = useSupabase();

  return (
    <View className="flex-1 bg-background" onLayout={onLayoutRootView}>
      {/* <Slot /> */}
      <Text>Hello World</Text>
    </View>
  );
}

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    // <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootLayout />
        </ThemeProvider>
      </SupabaseProvider>
    </QueryClientProvider>
    // </SafeAreaProvider>
  );
}
