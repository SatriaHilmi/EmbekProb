import React, { useRef, useState, useEffect } from "react";

interface Testimonial {
    text: string;
    author: string;
}

interface Props {
    TestimonialCar: Testimonial[];
}

export const TestimonialCar: React.FC<Props> = ({ TestimonialCar }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);

    // Tentukan jumlah card per view sesuai lebar layar
    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth >= 1024) setCardsPerView(2);
            else setCardsPerView(1);
        };

        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    // Update index aktif berdasarkan posisi scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const width = container.clientWidth;
            const scrollLeft = container.scrollLeft;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll ke slide sesuai dot
    const scrollToIndex = (index: number) => {
        const container = scrollRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const targetScroll = width * index;

        container.scrollTo({
            left: targetScroll,
            behavior: "smooth",
        });

        // update segera
        setActiveIndex(index);
    };

    // Total slide (tiap slide berisi 1 atau 2 card)
    const totalSlides = Math.ceil(TestimonialCar.length / cardsPerView);

    return (
        <div className="relative w-full flex flex-col items-center">
            {/* Container scroll */}
            <div
                ref={scrollRef}
                className="
                    flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                    w-full max-w-7xl px-4 py-6 gap-6
                "
                style={{
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {TestimonialCar.map((t, i) => (
                    <div
                        key={i}
                        className="
                            flex-shrink-0 snap-start bg-white text-gray-800 rounded-[24px]
                            shadow-lg p-8 text-left transition-transform duration-500
                            w-[100%] sm:w-[100%] lg:w-[calc(50%-0.75rem)]
                        "
                    >
                        <p className="mb-4 text-lg leading-relaxed">"{t.text}"</p>
                        <span className="text-sm font-semibold text-green-700">
                            — {t.author}
                        </span>
                    </div>
                ))}
            </div>

            {/* Hilangkan scrollbar */}
            <style>{`
                ::-webkit-scrollbar { display: none; }
            `}</style>

            {/* Dots navigation */}
            <div className="flex mt-6 space-x-2 z-10 relative">
                {Array.from({ length: totalSlides }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToIndex(i)}
                        className={`h-3 rounded-full transition-all duration-300 cursor-pointer
                            ${i === activeIndex ? "bg-green-600 w-10" : "bg-gray-400 w-3"}
                        `}
                    />
                ))}
            </div>
        </div>
    );
};
