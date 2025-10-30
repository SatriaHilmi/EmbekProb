import { useState, useEffect } from "react";

interface BreedingImage {
    desc: string;
}

export const BreedingCom: React.FC = () => {
    const card: BreedingImage[] = [
        { desc: "Healthy and strong goats in our breeding program." },
        { desc: "Our breeding facilities ensure optimal growth." },
        { desc: "Expert care for our breeding stock." },
    ];

    const [current, setCurrent] = useState(0);

    // Ganti slide otomatis tiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % card.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full flex flex-col items-center justify-center mt-10">
            {/* Slide Container */}
            <div className="w-full max-w-5xl min-h-[100px] sm:min-h-[120px] md:min-h-[160px] lg:min-h-[200px] flex items-center justify-center overflow-hidden px-2">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {card.map((crd, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full text-center flex items-center justify-center"
                        >
                            {/* Breeding Program Description */}
                            <p className="text-3xl md:text-5xl font-medium text-white font-bebas">
                                {crd.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicator Bullets */}
            <div className="flex gap-2 mt-4">
                {card.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${index === current ? "bg-green-600 w-10" : "bg-gray-400 w-3"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
