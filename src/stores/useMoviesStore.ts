import { IMoviesRoot, IInfinitePages } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TMovieStore = {
  storedSearchTerm: string;
  storedMovies: IInfinitePages;

  setIsHydrated: (isHydrated: boolean) => void;
  setStoredMovies: (movies: IInfinitePages, searchTerm: string) => void;
};

export const useMoviesDataStore = create<TMovieStore>()(
  persist(
    (set, get) => ({
      storedSearchTerm: "",
      storedMovies: {
        pageParams: [1],
        pages: [],
      },

      setIsHydrated: (isHydrated: boolean) => {
        set((state) => ({ ...state, isHydrated: true }));
      },
      setStoredMovies: (movies: IInfinitePages, searchTerm: string) => {
        set({
          storedMovies: movies,
          storedSearchTerm: searchTerm,
        });
      },
    }),
    {
      name: "movies-storage",
      getStorage: () => localStorage,
    }
  )
);
