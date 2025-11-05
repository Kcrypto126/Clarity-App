import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase/supabase";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_API_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase configuration:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
  });
}

// Check if we're in a React Native runtime environment (not Node.js build process)
// In Node.js build process: window is undefined and we have process.versions.node
// In React Native runtime: window might be undefined but we don't have process.versions.node (or we're in a runtime)
const isNodeJS =
  typeof window === "undefined" &&
  typeof process !== "undefined" &&
  process.versions?.node &&
  !global.navigator?.product; // React Native has navigator.product = "ReactNative"
const isReactNative = !isNodeJS;

// Lazy-load AsyncStorage only in React Native environment
// Use require() to prevent module-level execution that accesses window
let AsyncStorage: any = null;
if (isReactNative) {
  try {
    // Use require instead of import to prevent eager evaluation
    const asyncStorageModule = require("@react-native-async-storage/async-storage");
    AsyncStorage = asyncStorageModule.default || asyncStorageModule;
  } catch (error) {
    // Silently fail if AsyncStorage is not available (e.g., during Node.js build)
    console.log("AsyncStorage not available, using memory storage");
  }
}

export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-key",
  {
    auth: {
      storage: AsyncStorage || undefined,
      autoRefreshToken: true,
      persistSession: !!AsyncStorage,
      detectSessionInUrl: false,
    },
  }
);

// Only set up AppState listener in React Native environment
if (isReactNative) {
  try {
    const { AppState } = require("react-native");
    AppState.addEventListener("change", (state: string) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
  } catch (error) {
    // Silently fail if AppState is not available (e.g., during build)
    console.log("AppState not available, skipping listener setup");
  }
}
