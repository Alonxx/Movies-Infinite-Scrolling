export interface IItemMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMoviesRoot {
  page: number;
  total_pages: number;
  total_results: number;
  results: IItemMovie[];
}

export interface IInfinitePages {
  pageParams: number[];
  pages: IMoviesRoot[];
}
