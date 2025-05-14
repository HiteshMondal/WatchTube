import { signUpWithEmailAndPassword } from "@/services/authWithOAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUpWithEmailAndPassword(email, password);
      router.push("/tabs/profile/signin");
    } catch (error) {
      Alert.alert("Sign-Up Error");
    }
  };

  return (
    <View className="flex-1 justify-center p-5">
      <Text className="text-center text-xl font-semibold">Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text
        onPress={() => router.push("/tabs/profile/signin")}
        className="text-blue-500 text-center mt-4"
      >
        Already have an account? Sign in
      </Text>
    </View>
  );
};

export default SignUp;  // Ensure this default export
