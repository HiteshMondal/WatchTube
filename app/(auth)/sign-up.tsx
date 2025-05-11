import { account } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignUp = () => {
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
      await account.create("unique()", email, password);
      Alert.alert("Success", "Account created successfully.");
      router.replace("/sign-in"); // Redirect to sign-in after successful signup
    } catch (error: any) {
      Alert.alert("Sign Up failed", error.message || "Unknown error");
    } finally {
      setLoading(false);
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

      {/* Sign-In Button/Link */}
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

export default SignUp;
