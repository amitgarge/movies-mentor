import { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const popular_movies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (popular_movies) return;

    const getPopularMovies = async () => {
      const data = await fetch(`${BACKEND_URL}/api/movies/popular`);
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    };

    getPopularMovies();
  }, [dispatch, popular_movies]);
};

export default usePopularMovies;
