import { useAuth } from '@/context/AuthContext';
import { appwriteGetUser, appwriteSignIn } from '@/services/appwriteAuth';
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

export default function SignIn() {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await appwriteSignIn(email, password);
      const user = await appwriteGetUser();
      setUser(user);
      router.replace('/tabs');
    } catch (err: any) {
      console.error('Login failed', err);
      Alert.alert('Login Failed', err.message || 'Invalid credentials.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-primary px-6 justify-center"
    >
      <Text className="text-white text-3xl font-bold mb-6">Welcome Back 👋</Text>

      <View className="mb-4">
        <Text className="text-light-300 mb-2">Email</Text>
        <TextInput
          className="bg-dark-100 text-white px-4 py-3 rounded-lg"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white text-base font-semibold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/profile/signup')}
        className="mt-6"
      >
        <Text className="text-light-300 text-center">
          Don’t have an account?{' '}
          <Text className="text-blue-400 underline">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
