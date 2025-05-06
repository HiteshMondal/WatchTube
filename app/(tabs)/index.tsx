import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: loadingMovies, error: errorMovies } = useFetch(() => fetchMovies({ query: '' }));

  const renderHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-4 mb-5 mx-auto" />
      <SearchBar
        onPress={() => {
          router.push('/search');
        }}
        placeholder="Search!"
      />
      <Text className="text-lg text-white font-semibold mt-5 mb-3">Latest Movies</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Image source={images.bg} className="absolute size-full z-0" />

      {loadingMovies ? (
        <ActivityIndicator size="large" />
      ) : errorMovies ? (
        <Text className="text-red-500 px-5">Error: {errorMovies}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <View className="px-5 py-2">
              <Text className="text-white">{item.title}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
