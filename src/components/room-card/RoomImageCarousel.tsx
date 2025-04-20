
import { useState, useRef, useEffect } from "react";

interface RoomImageCarouselProps {
  images: { url: string; alt: string }[];
}

const RoomImageCarousel = ({
  images
}: RoomImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isPaused && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImage((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 8000);
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [isPaused, images.length]);

  // Small navigation handler for arrows/thumbnails
  const handleNavigation = (index: number) => {
    setIsPaused(true);
    setCurrentImage(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 8000);
  };

  // Fallback
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            alt: "Default room image"
          }
        ];

  return (
    <div className="relative h-96 overflow-hidden group">
      <img
        src={displayImages[currentImage].url}
        alt={displayImages[currentImage].alt}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:scale-110"
      />
      {displayImages.length > 1 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() =>
              handleNavigation(
                currentImage === 0
                  ? displayImages.length - 1
                  : currentImage - 1
              )
            }
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={() =>
              handleNavigation(
                currentImage === displayImages.length - 1
                  ? 0
                  : currentImage + 1
              )
            }
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomImageCarousel;
