// app/tabs/profile/SignIn.tsx
import { signInWithEmailAndPassword } from "@/services/authWithOAuth"; // Firebase sign-in method
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(email, password);
      router.push("/tabs/profile");  // Navigate to profile screen after successful sign-in
    } catch (error) {
      Alert.alert("Sign-In Error");
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-center text-xl font-semibold">Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 p-2 mt-4 rounded"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 p-2 mt-4 rounded"
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text
        onPress={() => router.push("../profile/signup")}
        className="text-blue-500 text-center mt-4"
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

export default SignIn;
