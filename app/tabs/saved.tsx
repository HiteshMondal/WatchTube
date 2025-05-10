import { icons } from '@/constants/icons';
import { useSaved } from '@/context/SavedContext'; // Import the hook
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SavedMovie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  poster_path: string | null;
}

const Saved = () => {
  const { savedMovies } = useSaved(); // Use the hook to get saved movies

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
      {item.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          className="w-32 h-48 rounded-lg mb-3"
        />
      )}
      <Text className="text-white font-semibold text-base">{item.title}</Text>
      <Text className="text-light-200 text-sm mt-1">
        {item.release_date?.split('-')[0]} • {item.runtime}m
      </Text>
    </View>
  );

  // Map savedMovies (of type Movie[]) to SavedMovie[] to ensure proper type matching
  const savedMoviesMapped: SavedMovie[] = savedMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date, // Ensure you have this property in your movie data
    runtime: movie.runtime,           // Ensure you have this property in your movie data
    poster_path: movie.poster_path,
  }));

  return (
    <SafeAreaView className="bg-primary flex-1 px-5 pt-4">
      {savedMoviesMapped.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={savedMoviesMapped}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Saved;
