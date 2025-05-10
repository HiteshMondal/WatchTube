import { icons } from '@/constants/icons';
import { useSaved } from '@/context/SavedContext'; // Import the hook to access saved context
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
}

const MovieCard = ({ id, poster_path, title, release_date, vote_average }: MovieCardProps) => {
  const { savedMovies, addToSaved, removeFromSaved } = useSaved(); // Get savedMovies and actions from context

  // Memoize isSaved to prevent unnecessary recalculations
  const isSaved = useMemo(() => savedMovies.some((movie) => movie.id === id), [savedMovies, id]);

  // Handle save/remove logic
  const handleSaveToggle = () => {
    if (isSaved) {
      removeFromSaved(id); // Remove the movie if it's already saved
    } else {
      addToSaved({ id, poster_path, title, release_date, vote_average }); // Add movie to saved list
    }
  };

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[140px] mr-4">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/140x200/1a1a1a/ffffff?text=No+Image`,
          }}
          className="w-full h-[200px] rounded-lg"
          resizeMode="cover"
        />
        
        <Text className="text-white font-medium mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center mt-1">
          <Image source={icons.star} className="w-4 h-4 mr-1" tintColor="#facc15" />
          <Text className="text-xs text-white font-semibold">{(vote_average / 2).toFixed(1)} / 5</Text>
        </View>

        <View className="flex-row justify-between mt-1">
          <Text className="text-xs text-gray-300">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </Text>
          <Text className="text-xs text-gray-300">
            {vote_average > 0 ? vote_average.toFixed(1) + '★' : 'N/A'}
          </Text>
        </View>

        {/* Save/Remove button */}
        <TouchableOpacity
          onPress={handleSaveToggle}
          className={`mt-2 p-2 rounded-lg ${isSaved ? 'bg-red-500' : 'bg-blue-500'}`}
          accessibilityLabel={isSaved ? 'Remove movie from saved list' : 'Add movie to saved list'}
          accessibilityRole="button"
        >
          <Text className="text-white text-xs font-semibold">
            {isSaved ? 'Remove from Saved' : 'Save Movie'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
