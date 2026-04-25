import { memo, useMemo } from "react";
import MovieCard from "./MovieCard";
import ShimmerMovieCard from "./ShimmerMovieCard";

const MovieList = ({ title, movies }) => {
  // ✅ useMemo prevents recalculating mapped movies on each render
  const renderedMovies = useMemo(() => {
    if (!movies) {
      // Loading state shimmer placeholders
      return Array(6)
        .fill("")
        .map((_, index) => <ShimmerMovieCard key={index} />);
    }

    if (movies.length === 0) {
      // Empty state
      return <p className="text-gray-500">No movies available</p>;
    }

    // ✅ Main list rendering
    return movies.map((movie) => (
      <div className="snap-start" key={movie?.id}>
        <MovieCard posterPath={movie.poster_path} />
      </div>
    ));
  }, [movies]);

  return (
    <div className="px-6 py-4 lg:my-auto">
      <h1 className="text-black text-lg md:text-2xl font-semibold mb-2">
        {title}
      </h1>

      <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-custom">
        {renderedMovies}
      </div>
    </div>
  );
};

// ✅ Memoize the component to prevent re-rendering unless props change
export default memo(MovieList);
