import MovieCard from "./MovieCard";
import ShimmerMovieCard from "./ShimmerMovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-4 lg:my-auto">
      <h1 className="text-black text-lg md:text-2xl font-semibold mb-2">
        {title}
      </h1>

      <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-custom">
        {!movies ? (
          //Show shimmer placeholders while loading
          Array(6)
            .fill("")
            .map((_, index) => <ShimmerMovieCard key={index} />)
        ) : movies.length === 0 ? (
          //Empty state message
          <p className="text-gray-500">No movies available</p>
        ) : (
          movies.map((movie) => (
            <div className="snap-start" key={movie?.id}>
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
