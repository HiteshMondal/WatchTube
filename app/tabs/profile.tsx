import { images } from "@/constants/images";
import { account } from "@/lib/appwrite"; // adjust the path if different
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    account.get()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.error("User fetch failed", err);
        router.replace("/sign-in"); // redirect to sign-in if not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/sign-in");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
        source={{ uri: user?.prefs?.avatar || images.avatar }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-white text-xl font-bold">{user.name}</Text>
      <Text className="text-white text-sm mb-6">{user.email}</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
