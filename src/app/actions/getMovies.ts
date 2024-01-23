import { IMoviesRoot } from "@/models";

export const getMovies = async (title: string, pages: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_THE_MOVIE_SEARCH_URL}${title}&page=${pages}`
    );
    const data = await response.json();
    const movies: IMoviesRoot = data;
    return movies;
  } catch (error) {
    console.log(error);
  }
};
