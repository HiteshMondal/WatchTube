// app/(auth)/sign-in.tsx
import { account } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    setLoading(true);
    try {
      await account.createSession(email, password);
      router.replace("/tabs");
    } catch (error: any) {
      Alert.alert("Login failed", error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View className="flex-1 justify-center items-center px-5 bg-primary">
      <Text className="text-white text-2xl font-bold mb-6">Sign In</Text>

      <TextInput
        className="w-full bg-dark-200 text-white px-4 py-3 rounded-lg mb-4"
        placeholder="Email"
        placeholderTextColor="#A8B5DB"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="w-full bg-dark-200 text-white px-4 py-3 rounded-lg mb-6"
        placeholder="Password"
        placeholderTextColor="#A8B5DB"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-accent px-6 py-3 rounded-xl w-full"
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text className="text-center text-white font-semibold text-base">
          {loading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
