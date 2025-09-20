import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openAI from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addMovieSearchResults } from "../utils/searchSlice";

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearchClick = async () => {
    const openAIQuery =
      "Act as a movie recommendation system and suggest some movies for the query:" +
      searchText.current.value +
      ". only gives me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar2, Don, Sholay, Golmaal, Koi Mil Gaya";

    const openAIResults = await openAI.chat.completions.create({
      messages: [{ role: "user", content: openAIQuery }],
      model: "gpt-3.5-turbo",
    });

    const movies = openAIResults.choices?.[0]?.message?.content.split(", ");

    const promiseArray = movies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addMovieSearchResults({ movieNames: movies, movieResults: tmdbResults })
    );    
  };

  const langKey = useSelector((store) => store.config.lang);
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
          className="px-6 bg-red-600 text-white font-semibold hover:bg-red-700 transition text-xs sm:text-base lg:text-base"
          onClick={handleSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
