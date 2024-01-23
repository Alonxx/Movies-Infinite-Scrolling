"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getMovies } from "./actions";
import { SearchInput } from "@/components";
import { MoviesInfiniteScroll } from "@/components";

const queryClient = new QueryClient();

export default function Home() {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const onHandlerInputResult = (title: string | undefined, error: boolean) => {
    if (error) return;
    if (!title) return;
    setSearchTerm(title);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main className=" flex justify-center items-center flex-col gap-8 ">
        <h1 className=" mt-10 font-bold text-2xl md:text-6xl">
          MOVIE SEARCH 📽️{" "}
        </h1>
        <div className="w-[70%]">
          <SearchInput onHandlerResult={onHandlerInputResult} />
        </div>
      </main>
      <div className="p-3">
        <MoviesInfiniteScroll getMovies={getMovies} searchTerm={searchTerm} />
      </div>
    </QueryClientProvider>
  );
}
