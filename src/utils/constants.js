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
