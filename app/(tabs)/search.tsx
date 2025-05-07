import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {

  const router = useRouter();
  const fetchPopularMovies = useCallback(() => fetchMovies({ query: '' }), []);
  const { data: movies, loading: loadingMovies, error: errorMovies } = useFetch(fetchPopularMovies);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute size-full z-0 resizeMode=cover' />
    
      <FlatList data={movies} renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='mt-3 pb-10'
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingHorizontal: 20}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row items-center justify-between mt-24'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View>
              <SearchBar placeholder='Search for movies!' />
            </View>
            {loadingMovies && (
              <ActivityIndicator size='large' color={'#ab8bff'} className='my-10'/>
            )}
            {errorMovies && (
              <Text className='text-red-500 px-5'>Error: {errorMovies}</Text>
            )}
          </>
        }
      />

    </View>
  )
}

export default Search