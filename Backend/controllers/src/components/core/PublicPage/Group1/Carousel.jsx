import React, { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const { get } = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const categoryName = "Carousel";
        const data = await get(`/public/transaction/bycategoryname?categoryName=${categoryName}`);
        // console.log("Fetched transaction data carousel", data);
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchTransaction();



 
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides?.length === 0) return null;

  return (
    <div className="relative h-[594px] overflow-x-hidden shadow-xl ">
      {slides.map((slide, index) => {
        const imageUrl = `http://127.0.0.1:5500/backend${slide.Folder_Path}`;
        const uniqueKey = `${slide.Folder_Path}-${index}`; // ✅ Ensures key is always unique

        return (
          <div
            key={uniqueKey}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={imageUrl}
                key={currentIndex}
                alt={slide.Upload_Title || `Slide ${index + 1}`}
                className="w-full h-full object-cover object-center animate-zoom"
                style={{ imageRendering: "auto" }}
              />

              {/* Custom keyframes using Tailwind-compatible class */}
              <style>
                {`
                  @keyframes zoom {
                    0% {
                      transform: scale(1);
                    }
                    100% {
                      transform: scale(1.1);
                    }
                  }

                  .animate-zoom {
                    animation: zoom 10s ease-in-out forwards;
                  }
                `}
              </style>
            </div>

            <div className="absolute inset-0 bg-black/40 rounded-xl" />
            <div className="absolute bottom-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent text-white">
              <h2 className="text-3xl font-semibold mb-2">{slide.Upload_Title}</h2>
              <p className="text-lg mb-8">{slide.Upload_Description}</p>
            </div>
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full p-3 shadow-lg transition duration-300 z-20"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full p-3 shadow-lg transition duration-300 z-20"
      >
        ▶
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 ">
        {slides.map((_, i) => (
          <button
            key={`dot-${i}`} // ✅ Also made this key unique
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? "bg-white scale-125" : "bg-gray-300"
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
