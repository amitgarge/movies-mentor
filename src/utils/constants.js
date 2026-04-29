export const PHOTO =
  "https://avatars.githubusercontent.com/u/38751675?u=83b179f9092a0c095f5b77fdc2302623238e1213&v=4";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
};

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hi", name: "Hindi" },
  { identifier: "sp", name: "Spanish" },
];

export const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY;

export const TMDB_URL = "https://api.themoviedb.org/3/search/movie?query=";

export const TMDB_URL_OPTIONS = "&include_adult=false&language=en-US&page=1";

export const GENERE_MAP = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science: 878, // for "science fiction"
  fiction: 878,
  thriller: 53,
  war: 10752,
  western: 37,
};
