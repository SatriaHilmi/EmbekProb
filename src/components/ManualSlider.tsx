import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    title: string;
    content: string;
}

const slides: Slide[] = [
    {
        title: "Empowering Growth and Innovation",
        content:
            "The Siskiyou Economic Development Council (SEDC), operational since 1985, stands at the forefront of fostering balanced economic development in Siskiyou County.",
    },
    {
        title: "Our Commitment to Agriculture",
        content:
            "Agriculture, deeply rooted in our history, is pivotal to Siskiyou County’s economic landscape, providing significant income, employment, and sustainability.",
    },
    {
        title: "Future Vision",
        content:
            "We aim to support innovation, create opportunities for local businesses, and strengthen the agricultural foundation for sustainable growth.",
    },
];

const ManualSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-14 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Gambar kiri */}
                <div className="hidden lg:block lg:col-span-5 px-5">
                    <img
                        src="https://siskiyoufarmco.com/wp-content/uploads/2025/08/Show_13-Exposure.jpg"
                        alt="Our Work"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Konten kanan */}
                <div className="col-span-12 lg:col-span-7 px-5">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center lg:text-left mb-8">
                        Our <span className="text-blue-600">Work</span>
                    </h2>

                    {/* SLIDER */}
                    <div className="relative w-full overflow-hidden">
                        {/* wrapper flex */}
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-in-out"
                            // Kita gunakan calc untuk memperhitungkan gap antar slide.
                            // 100% menggeser selebar satu slide.
                            // '16px' adalah nilai piksel eksplisit untuk 'gap-4' (1rem). Ini lebih andal daripada 'rem'
                            // dan cocok dengan implementasi di Caraousel.tsx yang sudah berfungsi.
                            style={{ transform: `translateX(calc(-${current * 100}% - ${current * 16}px))` }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    // Setiap slide mengambil lebar penuh dari container, dan flex-shrink-0 mencegahnya menyusut.
                                    className="w-full flex-shrink-0"
                                >
                                    {/* min-h-[160px] memastikan tinggi yang konsisten antar slide untuk mencegah layout melompat. */}
                                    <div className="bg-white rounded-lg shadow p-6 h-full min-h-[160px]">
                                        <h3 className="text-xl font-semibold mb-3">{slide.title}</h3>
                                        <p className="text-gray-600">{slide.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* tombol navigasi */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* indikator */}
                        <div className="flex justify-center mt-4 gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrent(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`w-3 h-3 rounded-full transition-colors ${current === index ? "bg-blue-600" : "bg-gray-300"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManualSlider;
