import { Account, Client, Databases, ID, Query } from "appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
const account = new Account(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  const normalizedQuery = query.trim().toLowerCase();

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", normalizedQuery),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
        count: (existingMovie.count || 0) + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: normalizedQuery,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    console.log("TRENDING DOCS", result.documents);
    return result.documents.map((doc) => ({
      movie_id: doc.movie_id,
      title: doc.title,
      poster_url: doc.poster_url,
      searchTerm: doc.searchTerm,
      count: doc.count,
    }));
    
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export { account, client };
