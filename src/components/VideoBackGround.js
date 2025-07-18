import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
  //fetch the trailer video && updating the store with the trailer video
  const trailerKey = useSelector((store) => store.movies?.trailerVideo?.key);
  useMovieTrailer(movieId);
  return (
    <div className="w-full h-[90vh] overflow-hidden relative">
      {trailerKey ? (
        <iframe
          className="w-full h-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div className="text-white text-center pt-32">Loading trailer...</div>
      )}
    </div>
  );
};

export default VideoBackGround;
