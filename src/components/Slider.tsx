import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    title: string;
    desc: string;
}

const slides: Slide[] = [
    { title: "Beautiful Nature", desc: "Explore the beauty of untouched landscapes." },
    { title: "Mountain Adventure", desc: "Conquer the highest peaks with us." },
    { title: "Ocean Breeze", desc: "Relax by the waves and enjoy the sunset." },
    { title: "Ocean Breeze 2", desc: "Another refreshing view." },
    { title: "Mountain 2", desc: "Relax by the waves and enjoy the sunset." },
    { title: "Ocean Breeze 3", desc: "Relax by the waves and enjoy the sunset." },
];

export const Slider: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleSlides(3); // desktop
            } else if (window.innerWidth >= 640) {
                setVisibleSlides(2); // tablet
            } else {
                setVisibleSlides(1); // mobile
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) =>
            prev >= slides.length - visibleSlides ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev <= 0 ? slides.length - visibleSlides : prev - 1
        );
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-12 mb-10">
            <h2 className="text-4xl sm:text-4xl font-bold mb-6 text-center font-bebas">
                Our <span className="text-green-600 text-5xl font-bold">Work</span>
            </h2>

            {/* Wrapper */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${current * (100 / visibleSlides)}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
                        >
                            <div className="bg-gray-100 rounded-2xl p-6 text-center shadow-lg h-full">
                                <h3 className="text-gray-800 text-lg font-semibold">
                                    {slide.title}
                                </h3>
                                <p className="text-gray-600 mt-2">{slide.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-15">
                <button
                    onClick={prevSlide}
                    className="bg-gray-300 px-2 py-2 rounded-full hover:bg-gray-400 cursor-pointer"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-gray-300 px-2 py-2 rounded-full hover:bg-gray-400 cursor-pointer"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Indicators */}
            <div className="flex gap-2 -mt-20 justify-center items-center">
                {Array.from({ length: slides.length - visibleSlides + 1 }).map((_, index) => (
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
