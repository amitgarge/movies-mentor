import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
  const trailerKey = useSelector((store) => store.movies?.trailerVideo?.key);
  useMovieTrailer(movieId);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {trailerKey ? (
        <iframe
          className="w-full h-full object-cover"
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
