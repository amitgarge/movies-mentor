import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.search);

  if (!movieNames) return null;
  return (
    <div className="p-4 m-4">
      <div>
        {movieNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default MovieSuggestions;
