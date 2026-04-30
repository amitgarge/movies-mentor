import { useEffect } from "react";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  useEffect(() => {
    if (upcomingMovies) return;

    const getUpcomingMovies = async () => {
      const data = await fetch(`${BACKEND_URL}/api/movies/upcoming`);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    };

    getUpcomingMovies();
  }, [dispatch, upcomingMovies]);
};

export default useUpcomingMovies;
