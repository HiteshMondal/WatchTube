import { SavedProvider } from "@/context/SavedContext";
import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <SavedProvider>
      <Stack>
        {/* Register the top-level layout folders only */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </SavedProvider>
  );
}
