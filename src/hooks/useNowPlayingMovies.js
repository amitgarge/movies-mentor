import { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  useEffect(() => {
    if (nowPlayingMovies) return;

    const getNowPlayingMovies = async () => {
      const data = await fetch(`${BACKEND_URL}/api/movies/now-playing`);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    };

    getNowPlayingMovies();
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;
