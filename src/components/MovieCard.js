import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-48 md:w-60 hover:scale-105 transition-transform duration-300">
      <img
        src={IMAGE_CDN_URL + posterPath}
        alt="Movie Poster"
        className="rounded-lg shadow-md"
      />
    </div>
  );
};


export default MovieCard;
