import { AuthProvider } from '@/context/AuthContext';
import { SavedProvider } from "@/context/SavedContext";
import { Slot, Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
    <AuthProvider>
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
          <Slot />
        </Stack>
      </SavedProvider>
    </AuthProvider>
  );
}
