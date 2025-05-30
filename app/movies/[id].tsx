import { icons } from "@/constants/icons";
import { useSaved } from "@/context/SavedContext";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = params.id;
  if (!id || typeof id !== "string") {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white">Invalid Movie ID</Text>
      </SafeAreaView>
    );
  } 

  const fetchMovie = useCallback(() => fetchMovieDetails(id), [id]);
  const { data: movie, loading, error } = useFetch(fetchMovie);
  const { savedMovies, addToSaved, removeFromSaved } = useSaved();
  const isSaved = movie && savedMovies.some((m) => m.id === movie.id);
  
  useEffect(() => {
    if (movie && movie.id && !isSaved) {
      const movieWithFallback = {
        ...movie,
        poster_path: movie.poster_path ?? "https://default-image-url.com",
      };
      addToSaved(movieWithFallback);
    }
  }, [movie]);

 
  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  if (error) {
    console.error("Error fetching movie details:", error);
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white">Failed to load movie details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={
              movie?.poster_path
                ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                : undefined
            }
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image source={icons.play} className="w-6 h-7 ml-1" resizeMode="stretch" />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}{" "}
              •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"} />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={movie?.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            />
            <MovieInfo
              label="Revenue"
              value={movie?.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            />
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((c) => c.name).join(" • ") || "N/A"} />
        </View>
        
        <View className="flex-col items-start justify-center mt-5 px-5">
        <Text className="text-white font-bold text-xl">{movie?.title}</Text>

        <View className="flex-row items-center gap-x-1 mt-2">
          <Text className="text-light-200 text-sm">
            {movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A"} •
          </Text>
          <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
        </View>

        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white font-bold text-sm">
            {Math.round(movie?.vote_average ?? 0)}/10
          </Text>
          <Text className="text-light-200 text-sm">({movie?.vote_count} votes)</Text>
        </View>

        <TouchableOpacity
          className="mt-4 bg-accent rounded-lg py-3 px-4 flex items-center justify-center self-stretch"
          onPress={() => {
            if (movie) {
              const movieWithFallback = {
                ...movie,
                poster_path: movie.poster_path ?? "https://default-image-url.com",
              };
              isSaved ? removeFromSaved(movie.id) : addToSaved(movieWithFallback);
            }
          }}
        >
          <Text className="text-white font-semibold text-base">
            {isSaved ? "Remove from Saved" : "Save Movie"}
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
