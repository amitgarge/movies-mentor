import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const VideoTitle = ({ title, overview }) => {
  const langKey = useSelector((store) => store.config.lang); // ✅ current language

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-black/80 z-10 text-white">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">
        {title}
      </h1>

      {/* Overview (hidden on small screens) */}
      <p className="hidden md:inline-block text-sm sm:text-base lg:text-lg max-w-md sm:max-w-xl lg:max-w-2xl mb-4 sm:mb-6 line-clamp-4">
        {overview}
      </p>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
        <button
          className="flex items-center justify-center bg-white text-black 
                     px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 
                     rounded-lg font-medium sm:font-semibold 
                     hover:bg-gray-200 active:scale-95 transition 
                     text-sm sm:text-base lg:text-lg min-w-[100px]"
        >
          ▶ {lang[langKey].play}
        </button>

        <button
          className="flex items-center justify-center bg-gray-700 text-white 
                     px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 
                     rounded-lg font-medium sm:font-semibold 
                     hover:bg-gray-600 active:scale-95 transition 
                     text-sm sm:text-base lg:text-lg min-w-[120px]"
        >
          ℹ {lang[langKey].moreInfo}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
