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
        <div className="relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Our <span>Work</span></h2>

            {/* Wrapper */}
            <div className="flex items-center justify-center gap-6 relative">
                {slides.map((slide, index) => {
                    // Hitung posisi slide relatif terhadap current
                    const isActive = index === current;
                    const isPrev = index === (current - 1 + slides.length) % slides.length;
                    const isNext = index === (current + 1) % slides.length;

                    return (
                        <div
                            key={index}
                            className={`
                transition-all duration-500 ease-in-out
                ${isActive ? "scale-100 opacity-100 z-20" : "scale-90 opacity-50 z-10"}
                ${isPrev || isNext ? "block" : "hidden"}
                w-80 bg-gray-100 rounded-2xl p-6 text-center shadow-lg
              `}
                        >
                            <h3 className="text-lg font-semibold">{slide.title}</h3>
                            <p className="text-gray-600 mt-2">{slide.desc}</p>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="absolute flex justify-center items-center gap-2 bottom-0">
                <button
                    onClick={prevSlide}
                    className="top-1/2 bottom-0 left-6 -translate-y-1/2 bg-gray-400/30 px-3 py-2 text-black rounded-full cursor-pointer hover:bg-white/20"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="top-1/2 bottom-0 right-6 -translate-y-1/2 bg-gray-400/30 px-3 py-2 text-black rounded-full cursor-pointer hover:bg-white/20"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 mt-6">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 w-2 rounded-full ${index === current ? "bg-black/90" : "bg-black/30"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
