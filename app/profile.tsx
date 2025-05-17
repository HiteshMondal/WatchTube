import { login, signup } from '@/services/firebase';
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../assets/images/logo.png'; // adjust path if needed

const profile = () => {
  const [signState, setSignState] = useState<'Sign In' | 'Sign Up'>('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const userAuth = async () => {
    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black px-6 py-12 justify-center items-center">
      <Image source={logo} className="w-40 h-16 mb-8" resizeMode="contain" />
      <View className="w-full bg-neutral-900 p-6 rounded-xl">
        <Text className="text-white text-2xl font-bold text-center mb-6">{signState}</Text>

        {signState === 'Sign Up' && (
          <TextInput
            className="bg-neutral-800 text-white p-3 rounded-md mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor="#999"
          />
        )}

        <TextInput
          className="bg-neutral-800 text-white p-3 rounded-md mb-4"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="bg-neutral-800 text-white p-3 rounded-md mb-4"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity onPress={userAuth} className="bg-red-600 p-4 rounded-md mb-4">
          <Text className="text-white text-center font-semibold">{signState}</Text>
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <CheckBox value={rememberMe} onValueChange={setRememberMe} />
            <Text className="text-white ml-2">Remember me</Text>
          </View>
          <Text className="text-gray-300">Help?</Text>
        </View>

        <View className="items-center">
          {signState === 'Sign In' ? (
            <Text className="text-gray-300">
              New User?{' '}
              <Text className="text-white font-semibold" onPress={() => setSignState('Sign Up')}>
                Join Right Now!
              </Text>
            </Text>
          ) : (
            <Text className="text-gray-300">
              Already have an account?{' '}
              <Text className="text-white font-semibold" onPress={() => setSignState('Sign In')}>
                Sign In
              </Text>
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default profile;
