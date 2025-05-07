import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, poster_path, title, release_date, vote_average }: Movie) => {
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
            {release_date?.split('-')[0] || 'N/A'}
          </Text>
          <Text className="text-xs text-gray-300">{vote_average.toFixed(1)}★</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
