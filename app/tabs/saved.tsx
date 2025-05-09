import { icons } from '@/constants/icons';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SavedMovie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
}

const savedMovies: SavedMovie[] = []; // Replace with real data

const Saved = () => {
  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center gap-4">
      <Image source={icons.save} className="size-14" tintColor="#ccc" />
      <Text className="text-light-200 text-base text-center px-4">
        You haven’t saved any movies yet.
      </Text>
      <Text className="text-light-300 text-sm text-center px-4">
        Start exploring and tap the save icon on any movie to add it here.
      </Text>
    </View>
  );

  const renderMovieItem = ({ item }: { item: SavedMovie }) => (
    <View className="bg-dark-100 p-4 rounded-lg mb-4">
      <Text className="text-white font-semibold text-base">{item.title}</Text>
      <Text className="text-light-200 text-sm mt-1">
        {item.release_date?.split('-')[0]} • {item.runtime}m
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary flex-1 px-5 pt-4">
      {savedMovies.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Saved;
