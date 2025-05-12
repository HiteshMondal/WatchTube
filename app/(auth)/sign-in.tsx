import { account } from "@/services/appwrite";
import { signInWithOAuth } from "@/services/authWithOAuth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithOAuth("google");
      if (result.type === "success") {
        router.replace("/tabs");
      }
    } catch (err) {
      Alert.alert("Google login failed");
    }
  };

  // Check if a user is already signed in when the component mounts
  useEffect(() => {
    account.getSession("current")
      .then((session) => {
        if (session?.userId) {
          router.replace("/tabs/profile");
        }
      })
      .catch((err) => {
        console.log("No active session", err.message);
      });
  }, []);
  

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await account.createSession(email, password);
      router.replace("/tabs/profile");
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

      {/* Sign-Up Button/Link */}
      <View className="mt-4">
        <Text className="text-white">
          Don't have an account?{" "}
          <TouchableOpacity onPress={() => router.replace("/sign-up")}>
            <Text className="text-accent font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="bg-white mb-4 p-3 rounded-xl w-full"
      >
        <Text className="text-center text-black font-semibold">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
