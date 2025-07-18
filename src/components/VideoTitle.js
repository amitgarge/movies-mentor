const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-12 bg-gradient-to-r from-black z-10 text-white">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg max-w-2xl mb-6">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="bg-gray-700 text-white px-6 py-2 rounded font-semibold hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
