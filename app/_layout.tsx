import { SavedProvider } from "@/context/SavedContext";
import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
    <SavedProvider>
      <Stack>
        <Stack.Screen 
          name="tabs"     
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SavedProvider>
  );
}
