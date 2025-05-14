// app/tabs/profile.tsx
import { getCurrentUser, signOut } from "@/services/authWithOAuth"; // Firebase auth methods
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser(); // Fetch current user
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();  // Firebase sign-out method
    setUser(null);  // Reset user state
    router.push("../profile/signin"); 
  // Redirect to sign-in page
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center p-5">
        <Text className="text-center text-xl font-semibold">Profile</Text>
        <Button
          title="Sign In"
          onPress={() => router.push("../profile/signin")}
        />
        <Text
          onPress={() => router.push("../profile/signup")}
          className="text-blue-500 text-center mt-4"
        >
          Don't have an account? Sign up
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-center text-xl font-semibold">Welcome</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Profile;
