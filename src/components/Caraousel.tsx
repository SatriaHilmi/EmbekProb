import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
    src: string;
    title?: string;
    description?: string;
}

interface CaraouselProps {
    images: Image[];
    autoSlide?: boolean;
    slideInterval?: number;
}

export const Caraousel: React.FC<CaraouselProps> = ({ images, autoSlide = true, slideInterval = 6000 }) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    useEffect(() => {
        if (autoSlide) {
            const interval = setInterval(nextSlide, slideInterval);
            return () => clearInterval(interval);
        }
    }, [autoSlide, nextSlide, slideInterval]);

    return (
        <div className='relative w-full overflow-hidden top-10'>
            <div className='flex transition-transform duration-700 ease-in-out gap-4 scroll-smooth' style={{ transform: `translateX(calc(-${current * 100}% - ${current * 16}px))` }}>
                {images.map((img, index) => (
                    <div key={index} className='w-full flex-shrink-0 relative'>
                        <img src={img.src} alt={img.title || `Slide ${index}`} className='object-cover h-96 w-full' />
                        {(img.title || img.description) && (
                            <div className='absolute bottom-0 left-0 bg-gradient-to-t from-black/100 to-transparent p-5 w-full'>
                                <h2 className='text-white text-lg'>{img.title}</h2>
                                <p className='text-white text-sm'>{img.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* <button onClick={prevSlide} className='absolute top-1/2 left-6 -translate-y-1/2 bg-gray-400/50 px-3 py-2 text-black rounded-full cursor-pointer hover:bg-gray-500/50'>
                <ChevronLeft />
            </button>
            <button onClick={nextSlide} className='absolute top-1/2 right-6 -translate-y-1/2 bg-gray-400/50 px-3 py-2  text-black rounded-full cursor-pointer hover:bg-gray-500/50'>
                <ChevronRight />
            </button> */}

            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-2 w-2 rounded-full transition-all ${index === current ? 'bg-white/90 w-5' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}