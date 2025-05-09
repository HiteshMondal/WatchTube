import React, { createContext, ReactNode, useContext, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  [key: string]: any; // for additional fields
};

type SavedContextType = {
  savedMovies: Movie[];
  addToSaved: (movie: Movie) => void;
  removeFromSaved: (id: number) => void;
};

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  const addToSaved = (movie: Movie) => {
    setSavedMovies((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromSaved = (id: number) => {
    setSavedMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <SavedContext.Provider value={{ savedMovies, addToSaved, removeFromSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};
