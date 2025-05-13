import { account } from "@/services/appwrite";
import { signInWithOAuth } from "@/services/authWithOAuth";
import { ID } from "appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp  () {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Create an account with Appwrite
      await account.create(ID.unique(), email, password);
      Alert.alert("Success", "Account created successfully.");
      router.replace("/sign-in"); // Navigate to sign-in after successful signup
    } catch (error: any) {
      Alert.alert("Sign Up failed", error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithOAuth("google");
      if (result.type === "success") {
        try {
          // After successful OAuth, fetch the session info
          const session = await account.get(); 
          console.log("OAuth session created:", session);
          router.replace("/tabs"); // Navigate to the main screen after successful OAuth login
        } catch (err) {
          console.error("Session fetch failed:", err);
          Alert.alert("OAuth login failed", "Could not fetch user session.");
        }
      } else {
        Alert.alert("Google Sign-In failed", "OAuth result was not successful.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      Alert.alert("Google login failed");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-primary">
      <Text className="text-white text-2xl font-bold mb-6">Sign Up</Text>

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
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text className="text-center text-white font-semibold text-base">
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="bg-white mb-4 p-3 rounded-xl w-full mt-4"
      >
        <Text className="text-center text-black font-semibold">Sign up with Google</Text>
      </TouchableOpacity>

      <View className="mt-4">
        <Text className="text-white">
          Already have an account?{" "}
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text className="text-accent font-semibold">Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

