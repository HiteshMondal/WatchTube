import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const router = useRouter();
  const {data: movies, loading: loadingMovies, error: errorMovies} = useFetch(() => fetchMovies({query: ''}))

  return (
    <SafeAreaView className="flex-1">
      <Image source={images.bg} className="absolute size-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-4 mb-5 mx-auto" />
        
        {loadingMovies ? (
          <ActivityIndicator size="large" />
        ): errorMovies ? (
          <Text>Error: {errorMovies}</Text>          
        ): (
          <View className="flex-1 mt-5">
          <SearchBar 
            onPress={() => {
              router.push('/search')
            }}
            placeholder="Search!"
          />
        </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
