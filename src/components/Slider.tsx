import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    title: string;
    desc: string;
}

const slides: Slide[] = [
    {
        title: "Beautiful Nature",
        desc: "Explore the beauty of untouched landscapes.",
    },
    {
        title: "Mountain Adventure",
        desc: "Conquer the highest peaks with us.",
    },
    {
        title: "Ocean Breeze",
        desc: "Relax by the waves and enjoy the sunset.",
    },
];

export const Slider: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto px-2 py-12 flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                Our <span className="text-blue-600 text-3xl font-bold">Work</span>
            </h2>

            {/* Wrapper */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 relative w-full">
                {slides.map((slide, index) => {
                    const isActive = index === current;
                    const isPrev =
                        index === (current - 1 + slides.length) % slides.length;
                    const isNext = index === (current + 1) % slides.length;

                    return (
                        <div
                            key={index}
                            className={`
                transition-all duration-500 ease-in-out
                ${isActive ? "scale-100 opacity-100 z-20" : "scale-90 opacity-100 z-10"}
                ${isPrev || isNext ? "block" : "hidden"}
                w-full sm:w-72 md:w-80 bg-gray-100 rounded-2xl p-6 text-center shadow-lg
              `}
                        >
                            <h3 className="text-gray-800 sm:text-lg font-semibold">{slide.title}</h3>
                            <p className="text-gray-600 mt-2 text-sm sm:text-base">{slide.desc}</p>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="absolute flex justify-center items-center gap-2 bottom-4 sm:bottom-0">
                <button
                    onClick={prevSlide}
                    className="bg-gray-400/30 p-2 sm:px-3 sm:py-2 text-black rounded-full cursor-pointer hover:bg-white/20"
                >
                    <ChevronLeft size={10} className="sm:size-[20px]" />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-gray-400/30 p-2 sm:px-3 sm:py-2 text-black rounded-full cursor-pointer hover:bg-white/20"
                >
                    <ChevronRight size={10} className="sm:size-[20px]" />
                </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 mt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${index === current ? "bg-black/90" : "bg-black/30"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
