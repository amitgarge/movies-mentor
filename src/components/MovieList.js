import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-4 lg:my-auto">
      <h1 className="text-black text-lg md:text-2xl font-semibold mb-2">
        {title}
      </h1>
       <div className="flex overflow-x-scroll gap-4 scrollbar-hide">
        {movies?.map((movie) => (
          <div className="snap-start">
            <MovieCard key={movie?.id} posterPath={movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
