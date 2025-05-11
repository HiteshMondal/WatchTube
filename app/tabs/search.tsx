import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from "@/services/appwrite";
import useFetch from '@/services/useFetch';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const fetchMoviesByQuery = useCallback(() => fetchMovies({ query: searchQuery }), [searchQuery]);
  const { data, loading: loadingMovies, error: errorMovies, refetch: loadMovies, reset } = useFetch(fetchMoviesByQuery);
  const movies = data ?? [];

  const debounceRef = useRef<number | null>(null);

  // Handle input changes
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    // Clear previous debounce timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Set a new debounce timeout for search query
    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        loadMovies(); 
      } else {
        reset(); 
      }
    }, 10000); 

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current); // Clean up the timeout when component is unmounted or query changes
    };
  }, [searchQuery, loadMovies, reset]); // Only rerun when searchQuery changes

  useEffect(() => {
    // Update search count after fetching movies
    if (searchQuery.trim() && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies, searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute size-full z-0 resizeMode=cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='mt-3 pb-10'
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={React.memo(() => (
          <>
            <View className='w-full flex-row items-center justify-between mt-24'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder='Search Here!'
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            {loadingMovies && (
              <ActivityIndicator size='large' color={'#ab8bff'} className='my-10' />
            )}
            {errorMovies && (
              <Text className='text-red-500 px-5'>Error</Text>
            )}
            {!loadingMovies && !errorMovies && searchQuery.trim() && movies.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        ))}
      />

      {!loadingMovies && !errorMovies && searchQuery.trim() && movies.length === 0 && (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-white">No movies found for "{searchQuery}"</Text>
        </View>
      )}
    </View>
  );
};

export default Search;
