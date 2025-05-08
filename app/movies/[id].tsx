import React from 'react'
import { Image, ScrollView, View } from 'react-native'

const MovieDetails = () => {

  

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image source={{ uri: 'https://image.tmdb.org/t/p/w500${movie?.poster_path}' }} />
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails