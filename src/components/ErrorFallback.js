const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Something went wrong 😢
        </h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
