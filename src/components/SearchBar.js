import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { BACKEND_URL } from "../utils/constants";
import { addMovieSearchResults, setSearchLoading } from "../utils/searchSlice";
import toast from "react-hot-toast";
import {
  hasAdultContentIntent,
  isMovieQuery,
} from "../utils/searchGuards";

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  
  const langKey = useSelector((store) => store.config.lang);

  const debounceTimer = useRef(null);
  const cache = useRef({});

  const showNoResults = () => {
    dispatch(addMovieSearchResults({ movieNames: [], movieResults: [] }));
    dispatch(setSearchLoading(false));
  };

  const performSearch = async (query) => {
    const normalizedQuery = query.toLowerCase().trim();

    // 1. CACHE CHECK
    if (cache.current[normalizedQuery]) {
      dispatch(setSearchLoading(true));

      setTimeout(() => {
        dispatch(addMovieSearchResults(cache.current[normalizedQuery]));
        dispatch(setSearchLoading(false));
      }, 200);

      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Search request failed.");
      }

      if (!data?.movieResults?.length) {
        toast.error(lang[langKey].noMoviesFound);
        showNoResults();
        return;
      }

      const resultData = {
        movieNames: data.movieNames,
        movieResults: data.movieResults,
      };

      dispatch(addMovieSearchResults(resultData));
      cache.current[normalizedQuery] = resultData;

      toast.success(lang[langKey].moviesLoaded);
    } catch (err) {
      console.error("Search error:", err);
      toast.error(lang[langKey].searchError);
    } finally {
      dispatch(setSearchLoading(false));
    }
  };

  const handleSearchChange = (value) => {
    const query = value.trim();

    // Clear results if empty
    if (!query) {
      dispatch(addMovieSearchResults(null));
      return;
    }

    // Minimum length check
    if (query.length < 3) return;

    // Clear previous debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!isMovieQuery(query)) {
      debounceTimer.current = setTimeout(() => {
        const latestValue = searchText.current.value.trim();

        if (latestValue !== query) return;

        showNoResults();
        toast.error(
          hasAdultContentIntent(query)
            ? lang[langKey].adultContentNotAllowed
            : lang[langKey].invalidMovieName,
        );
      }, 700);

      return;
    }

    debounceTimer.current = setTimeout(() => {
      const latestValue = searchText.current.value.trim();

      // Prevent stale execution
      if (latestValue !== query || latestValue.length < 3) {
        return;
      }

      dispatch(addMovieSearchResults(null));
      dispatch(setSearchLoading(true));
      performSearch(latestValue);
    }, 700);
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
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
