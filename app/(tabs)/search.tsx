import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const fetchMoviesByQuery = useCallback(() => fetchMovies({ query: searchQuery }), [searchQuery]);
  const { data: movies, loading: loadingMovies, error: errorMovies } = useFetch(fetchMoviesByQuery);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  
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
            <View className="my-5">
              <SearchBar placeholder='Search Here!' value={searchQuery} onChangeText={handleSearch}/>
            </View>
            {loadingMovies && (
              <ActivityIndicator size='large' color={'#ab8bff'} className='my-10'/>
            )}
            {errorMovies && (
              <Text className='text-red-500 px-5'>Error: {errorMovies}</Text>
            )}
            {!loadingMovies &&
              !errorMovies &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />

    </View>
  )
}

export default Search