export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3', 
    Headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_ACCESS_TOKEN}`,
    },
  };
  
  export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.Headers,
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  };

  export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
      console.log("Fetching movie details for movieId:", movieId);
      const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;
  
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.Headers,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch movie details: ${response.statusText}, Response: ${errorText}`);
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Movie details fetched:", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching movie details:", error);
      throw new Error(error.message || "An error occurred while fetching movie details");
    }
  };
  
  
  
