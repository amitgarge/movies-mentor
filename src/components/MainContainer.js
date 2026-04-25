import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

// ✅ Lazy load the large video components
const VideoTitle = lazy(() => import("./VideoTitle"));
const VideoBackground = lazy(() => import("./VideoBackGround"));

// ✅ Simple fallback while the components load
const FallbackVideoLoader = () => (
  <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 text-gray-600 animate-pulse">
    Loading featured movie...
  </div>
);

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) {
    return (
      <div className="relative w-full h-screen bg-gray-300 animate-pulse flex items-center justify-center text-gray-600">
        Loading featured movie...
      </div>
    );
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-screen">
      {/* ✅ Suspense for lazy-loaded video components */}
      <Suspense fallback={<FallbackVideoLoader />}>
        <VideoBackground movieId={id} />
        <VideoTitle title={original_title} overview={overview} />
      </Suspense>
    </div>
  );
};

export default MainContainer;
