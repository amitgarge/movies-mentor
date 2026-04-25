import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

// ✅ Lazy-load MovieList for code splitting
const MovieList = lazy(() => import("./MovieList"));

// ✅ Simple shimmer fallback
const MovieListFallback = ({ title }) => (
  <div className="px-6 py-4 animate-pulse">
    <h1 className="text-gray-500 text-lg md:text-2xl font-semibold mb-2">
      Loading {title}...
    </h1>
    <div className="flex gap-4 overflow-x-hidden">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="w-32 h-48 bg-gray-300 rounded-md flex-shrink-0"
          />
        ))}
    </div>
  </div>
);

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="pb-16">
      {/* 🧩 Each list is lazily loaded with its own fallback */}
      <Suspense fallback={<MovieListFallback title="Now Playing" />}>
        <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      </Suspense>

      <Suspense fallback={<MovieListFallback title="Top Rated" />}>
        <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
      </Suspense>

      <Suspense fallback={<MovieListFallback title="Popular" />}>
        <MovieList title="Popular" movies={movies?.popularMovies} />
      </Suspense>

      <Suspense fallback={<MovieListFallback title="Upcoming Movies" />}>
        <MovieList title="Upcoming Movies" movies={movies?.upcomingMovies} />
      </Suspense>
    </div>
  );
};

export default SecondaryContainer;
