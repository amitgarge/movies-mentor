import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openAI from "../utils/openAI";
import { API_OPTIONS, TMDB_URL, TMDB_URL_OPTIONS } from "../utils/constants";
import { addMovieSearchResults, setSearchLoading } from "../utils/searchSlice";
import toast from "react-hot-toast";

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector((store) => store.search.loading);
  const langKey = useSelector((store) => store.config.lang);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(TMDB_URL + movie + TMDB_URL_OPTIONS, API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  const isMovieQuery = (query) => {
    if (!query || query.trim().length < 2) return false;
    const validPattern = /^[a-zA-Z0-9\s:.-]+$/;
    return validPattern.test(query);
  };

  const handleSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    if (!isMovieQuery(query)) {
      toast.error(lang[langKey].invalidMovieName);
      return;
    }

    dispatch(addMovieSearchResults(null));
    dispatch(setSearchLoading(true));

    const openAIQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      query +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar 2, Don, Sholay, Golmaal, Koi Mil Gaya";

    try {
      const openAIResults = await openAI.chat.completions.create({
        messages: [{ role: "user", content: openAIQuery }],
        model: "gpt-3.5-turbo",
      });

      const movies =
        openAIResults.choices?.[0]?.message?.content.split(", ") || [];

      if (movies.length === 0) {
        toast.error(lang[langKey].noMoviesFound);
        return;
      }

      const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addMovieSearchResults({ movieNames: movies, movieResults: tmdbResults })
      );

      toast.success(lang[langKey].moviesLoaded);
    } catch (err) {
      console.error("Search error:", err);
      toast.error(lang[langKey].searchError);
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  return (
    <div className="flex justify-center pt-40">
      <form
        className="flex w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-grow px-4 py-3 text-xs sm:text-base lg:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder={lang[langKey].searchPlaceHolder}
        />
        <button
          className="px-6 bg-red-600 text-white font-semibold hover:bg-red-700 transition text-xs sm:text-base lg:text-base flex items-center justify-center min-w-[90px]"
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading ? (
            <div
              role="status"
              aria-label="loading"
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>
          ) : (
            lang[langKey].search
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
