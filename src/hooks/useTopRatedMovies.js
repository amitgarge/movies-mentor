import { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    if (topRatedMovies) return;

    const getTopRatedMovies = async () => {
      const data = await fetch(`${BACKEND_URL}/api/movies/top-rated`);
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    };

    getTopRatedMovies();
  }, [dispatch, topRatedMovies]);
};

export default useTopRatedMovies;
