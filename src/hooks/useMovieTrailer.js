import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

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
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
