import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      const data = await res.json();

      if (!Array.isArray(data.results)) return;
      const filteredData = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      const trailer = filteredData || data.results?.[0];

      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
    }
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
