import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openAI from "../utils/openAI";
import {
  API_OPTIONS,
  TMDB_URL,
  TMDB_URL_OPTIONS,
  GENERE_MAP,
} from "../utils/constants";
import { addMovieSearchResults, setSearchLoading } from "../utils/searchSlice";
import toast from "react-hot-toast";
import {
  filterValidTMDBMovies,
  hasAdultContentIntent,
  isMovieQuery,
  parseMovieNamesFromAIResponse,
} from "../utils/searchGuards";

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  
  const langKey = useSelector((store) => store.config.lang);

  const debounceTimer = useRef(null);
  const cache = useRef({});

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      TMDB_URL + encodeURIComponent(movie) + TMDB_URL_OPTIONS,
      API_OPTIONS,
    );
    const json = await data.json();
    return filterValidTMDBMovies(json.results);
  };

  const parseQuery = (query) => {
    const qry = query.toLowerCase();

    let genreId = null;

    Object.keys(GENERE_MAP).forEach((genre) => {
      if (qry.includes(genre)) {
        genreId = GENERE_MAP[genre];
      }
    });

    return {
      year: qry.match(/\b(20\d{2})\b/)?.[0],
      isHindi: qry.includes("hindi"),
      isLatest: ["latest", "new", "recent", "current"].some((word) =>
        qry.includes(word),
      ),
      genreId,
    };
  };

  const fetchMoviesByDiscover = async ({
    year,
    isHindi,
    isLatest,
    genreId,
  }) => {
    let url = "https://api.themoviedb.org/3/discover/movie?";

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (year) url += `primary_release_year=${year}&`;
    if (isHindi) url += `with_original_language=hi&`;
    if (genreId) url += `with_genres=${genreId}&`;

    //FILTER: only released movies
    url += `release_date.lte=${today}&`;

    if (isLatest) {
      url += "sort_by=release_date.desc&";
    } else {
      url += "sort_by=popularity.desc&";
    }

    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();

    return filterValidTMDBMovies(json.results);
  };

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

    const parsed = parseQuery(query);

    // 2. STRUCTURED QUERY → TMDB DISCOVER
    if (parsed.year || parsed.isHindi || parsed.isLatest || parsed.genreId) {
      try {
        const movies = await fetchMoviesByDiscover(parsed);

        let finalMovies = movies;

        // Fallback if no movies found for given year
        if ((!movies || movies.length === 0) && parsed.year) {
          toast("No movies yet for this year. Showing latest available.");

          const fallbackYear = new Date().getFullYear() - 1;

          finalMovies = await fetchMoviesByDiscover({
            ...parsed,
            year: fallbackYear,
          });
        }

        // Still no movies found
        finalMovies = filterValidTMDBMovies(finalMovies);

        if (!finalMovies || finalMovies.length === 0) {
          toast.error(lang[langKey].noMoviesFound);
          showNoResults();
          return;
        }

        const resultData = {
          movieNames: [query],
          movieResults: [finalMovies],
        };

        dispatch(addMovieSearchResults(resultData));
        cache.current[normalizedQuery] = resultData;

        toast.success(lang[langKey].moviesLoaded);
      } catch (err) {
        console.error("Discover API Error:", err);
        toast.error(lang[langKey].searchError);
      } finally {
        dispatch(setSearchLoading(false));
      }

      return;
    }

    // 3. OPENAI FALLBACK
    const openAIQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      query +
      ". Only give me names of 5 movies, comma separated.";

    try {
      const openAIResults = await openAI.chat.completions.create({
        messages: [{ role: "user", content: openAIQuery }],
        model: "gpt-3.5-turbo",
      });

      const movies = parseMovieNamesFromAIResponse(
        openAIResults.choices?.[0]?.message?.content,
      );

      if (movies.length === 0) {
        toast.error(lang[langKey].noMoviesFound);
        showNoResults();
        return;
      }

      const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      const validGroups = movies.reduce(
        (acc, movie, index) => {
          const results = filterValidTMDBMovies(tmdbResults[index]);

          if (results.length > 0) {
            acc.movieNames.push(movie);
            acc.movieResults.push(results);
          }

          return acc;
        },
        { movieNames: [], movieResults: [] },
      );

      if (validGroups.movieResults.length === 0) {
        toast.error(lang[langKey].noMoviesFound);
        showNoResults();
        return;
      }

      const resultData = {
        movieNames: validGroups.movieNames,
        movieResults: validGroups.movieResults,
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
