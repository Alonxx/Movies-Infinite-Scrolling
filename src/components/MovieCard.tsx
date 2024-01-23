import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { IItemMovie } from "@/models";

//Componente que renderiza una card con la informacion de la pelicula

export const MovieCard: React.FC<{
  movie: IItemMovie;
}> = ({ movie }) => {
  return (
    <Card className=" relative w-20 h-28 md:w-40 md:h-56 bg-gradient-to-r from-cyan-500 to-blue-500">
      <CardHeader className="absolute z-10 w-full h-[100%] bg-black/25">
        <CardTitle className=" text-white text-sm md:text-lg">
          {movie.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full relative">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          sizes="500px"
          fill
          className="object-fit"
        />
      </CardContent>
    </Card>
  );
};
