import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerMovieCard from "./ShimmerMovieCard";
import lang from "../utils/languageConstants";

const ShimmerTitle = () => (
  <div className="w-32 h-5 bg-gray-300 rounded-md animate-pulse mb-2" />
);

const MovieSuggestions = () => {
  const { movieNames, movieResults, loading } = useSelector(
    (store) => store.search
  );
  const langKey = useSelector((store) => store.config.lang);

  // 1. Initial state → show nothing until user searches
  if (!loading && !movieNames) {
    return null;
  }

  // 2. Loading state → shimmer placeholders
  if (loading) {
    return (
      <div className="p-4 m-4">
        <h1 className="text-black text-xl md:text-2xl font-semibold mb-4">
          {lang[langKey].loadingResults}
        </h1>
        {Array(3)
          .fill("")
          .map((_, idx) => (
            <div key={idx} className="mb-6">
              <ShimmerTitle />
              <div className="flex overflow-x-auto gap-4 scrollbar-hide">
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <ShimmerMovieCard key={i} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  }

  // 3. Results state → grouped by movie name
  if (movieNames && movieResults?.length > 0) {
    return (
      <div className="p-4 m-4">
        {movieNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        ))}
      </div>
    );
  }

  // 4. Empty state → when API returns nothing
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-700">
      <p className="text-lg md:text-xl font-medium mb-4">
        {lang[langKey].noResults}
      </p>
      <p className="text-sm md:text-base text-gray-500">
        {lang[langKey].tryAgain}
      </p>
    </div>
  );
};

export default MovieSuggestions;
