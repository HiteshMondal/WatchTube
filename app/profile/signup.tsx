import { useAuth } from '@/context/AuthContext';
import { appwriteGetUser, appwriteSignUp } from '@/services/appwriteAuth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUp() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // 1. Sign up the user
      await appwriteSignUp(email, password, name);

      // 2. Auto-login the user
      const user = await appwriteGetUser();
      setUser(user);

      // 3. Redirect
      router.replace('/tabs');
    } catch (err: any) {
      console.error('Sign Up failed', err);
      Alert.alert('Sign Up Failed', err.message || 'Something went wrong.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-primary px-6 justify-center"
    >
      <Text className="text-white text-3xl font-bold mb-6">Create Account 🚀</Text>

      <View className="mb-4">
        <Text className="text-light-300 mb-2">Name</Text>
        <TextInput
          className="bg-dark-100 text-white px-4 py-3 rounded-lg"
          placeholder="Your name"
          placeholderTextColor="#888"
          onChangeText={setName}
          value={name}
        />
      </View>

      <View className="mb-4">
        <Text className="text-light-300 mb-2">Email</Text>
        <TextInput
          className="bg-dark-100 text-white px-4 py-3 rounded-lg"
          placeholder="you@example.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <View className="mb-6">
        <Text className="text-light-300 mb-2">Password</Text>
        <TextInput
          className="bg-dark-100 text-white px-4 py-3 rounded-lg"
          placeholder="Create a password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-blue-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white text-base font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/profile/signin')}
        className="mt-6"
      >
        <Text className="text-light-300 text-center">
          Already have an account?{' '}
          <Text className="text-blue-400 underline">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
