import SearchBar from "./SearchBar";
import MovieSuggestions from "./MovieSuggestions";

const Search = () => {
  return (
    <div className="pt-12 bg-gradient-to-br from-purple-100 to-blue-200 min-h-screen w-full">
      <SearchBar />
      <MovieSuggestions />
    </div>
  );
};

export default Search;
