import { useEffect, useRef, useState, memo } from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  // 🎯 Lazy loading logic (always called → safe for hooks)
  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgEl);
    return () => observer.disconnect();
  }, []);

  // 🚫 Skip rendering completely if no posterPath (after hook)
  if (!posterPath) return <></>;

  return (
    <div
      ref={imgRef}
      className="w-36 sm:w-44 md:w-52 lg:w-60 hover:scale-105 transition-transform duration-300"
    >
      {isVisible ? (
        <img
          src={IMAGE_CDN_URL + posterPath}
          alt="Movie Poster"
          loading="lazy"
          className="rounded-lg shadow-md"
        />
      ) : (
        // ✨ Shimmer only while the image is loading
        <div className="w-full h-56 bg-gray-300 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
};

// ⚡ Prevent unnecessary re-renders
export default memo(MovieCard);
