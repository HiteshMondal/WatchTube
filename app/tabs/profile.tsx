import { account } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in by fetching the current session
    account.getSession("current").then((session) => {
      if (session) {
        // If a session exists, fetch user info
        account.get()
          .then((res) => {
            setUser(res);
          })
          .catch((err) => {
            console.error("User fetch failed", err);
            router.replace("/sign-in"); // Redirect to sign-in if the user session is invalid
          })
          .finally(() => setLoading(false));
      } else {
        // If no session exists, redirect to the sign-in page
        router.replace("/sign-in");
      }
    }).catch(() => {
      // In case fetching session fails, redirect to sign-in
      router.replace("/sign-in");
    });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary items-center justify-center px-5">
      <Image
        source={{ uri: user?.prefs?.avatar || 'default-avatar-url' }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-white text-xl font-bold">{user.name}</Text>
      <Text className="text-white text-sm mb-6">{user.email}</Text>
    </View>
  );
};

export default Profile;
