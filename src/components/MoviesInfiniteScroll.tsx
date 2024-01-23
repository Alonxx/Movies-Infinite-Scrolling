"use client";

import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui";
import { useInView } from "react-intersection-observer";
import { IInfinitePages, IMoviesRoot } from "@/models";
import { MovieCard } from ".";
import { useMoviesDataStore } from "@/stores";

//Componente encargado de renderizar la lista de peliculas de forma infinita

export const MoviesInfiniteScroll: React.FC<{
  searchTerm: string;
  getMovies: (
    title: string,
    pageNumber: number
  ) => Promise<IMoviesRoot | undefined>;
}> = ({ searchTerm, getMovies }) => {
  const { setStoredMovies, storedSearchTerm, storedMovies } =
    useMoviesDataStore();

  const { ref, inView } = useInView();

  const searchMovies = (title: string, pageNumber: number) => {
    const result = getMovies(title, pageNumber);
    return result;
  };

  const { data, fetchNextPage, refetch, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["movies"],
      queryFn: ({ pageParam = 1 }) => searchMovies(searchTerm, pageParam),
      initialPageParam: 1,
      enabled: true,

      getPreviousPageParam: (firstPage) => {
        if (!firstPage) return 1;
        if (firstPage.page === 1) return undefined;
        return firstPage.page - 1;
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage) return 1;
        if (lastPage.page === lastPage.total_pages) return undefined;
        return lastPage.page + 1;
      },
    }
  );

  React.useEffect(() => {
    if (!data) return;
    if (data.pages.every((page) => page?.total_results === 0)) return;
    const pagesData = data as IInfinitePages;
    storedMoviesPages(pagesData);
  }, [data]);

  React.useEffect(() => {
    if (searchTerm === "") return;
    refetch();
  }, [searchTerm, refetch]);

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const storedMoviesPages = (pagesData: IInfinitePages) => {
    setStoredMovies(pagesData, searchTerm);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {data && (
        <div className="grid grid-cols-4 gap-10 mt-6">
          {storedMovies?.pages?.map((page) =>
            page?.results?.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          )}
        </div>
      )}
      <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
    </div>
  );
};
