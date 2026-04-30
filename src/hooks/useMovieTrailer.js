import { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    if (trailerVideo || !movieId) return;

    const getMovieVideos = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/movies/${movieId}/trailer`);
        const data = await res.json();

        dispatch(addTrailerVideo(data.result));
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    getMovieVideos();
  }, [dispatch, movieId, trailerVideo]);
};

export default useMovieTrailer;
