import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";

// ✅ Lazy load heavy components
const MainContainer = lazy(() => import("./MainContainer"));
const SecondaryContainer = lazy(() => import("./SecondaryContainer"));
const Search = lazy(() => import("./Search"));

// ✅ Simple fallback shimmer/spinner (shown while component loads)
const FallbackLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Browse = () => {
  const showSearch = useSelector((store) => store?.search?.showSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {/* ✅ Suspense handles component loading fallback */}
      <Suspense fallback={<FallbackLoader />}>
        {showSearch ? (
          <Search />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Browse;
