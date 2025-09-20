const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 bg-gradient-to-r from-black/80 z-10 text-white">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">
        {title}
      </h1>
      <p className="hidden md:inline-block text-sm sm:text-base lg:text-lg max-w-md sm:max-w-xl lg:max-w-2xl mb-4 sm:mb-6 line-clamp-4">
        {overview}
      </p>
      <div className="mt-4 flex gap-2 sm:gap-4 flex-wrap">
        <button className="bg-white text-black px-3 sm:px-5 lg:px-6 py-1 sm:py-2 rounded font-medium sm:font-semibold hover:bg-opacity-80 text-sm sm:text-base">
          ▶ Play
        </button>
        <button className="bg-gray-700 text-white px-3 sm:px-5 lg:px-6 py-1 sm:py-2 rounded font-medium sm:font-semibold hover:bg-opacity-80 text-sm sm:text-base">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
