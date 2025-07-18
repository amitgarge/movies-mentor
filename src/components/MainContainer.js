import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackGround";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; //Early Return

  const mainMovie = movies[0];
  console.log(mainMovie);

  const { original_title, overview } = mainMovie;

  return (
    <div className="relative w-full h-[90vh]">
      <VideoBackground />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
