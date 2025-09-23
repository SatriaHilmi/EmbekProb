import React, { useState, useEffect } from "react";
import deadpool from "../assets/deadpoll.jpg"

interface TestiProps {
    img: string;
    name: string;
    role: string;
    msg: string;
}

const testimonialData: TestiProps[] = [
    {
        img: deadpool.src,
        name: "Emelyn",
        role: "CEO",
        msg: "Good to serve"
    },
    {
        img: deadpool.src,
        name: "Emelyn",
        role: "CEO",
        msg: "Good to serve"
    },
    {
        img: deadpool.src,
        name: "Emelyn",
        role: "CEO",
        msg: "Good to serve"
    },
]

export const Testimonial: React.FC = () => {
    const [current, setCurrent] = useState(0);

    // auto slide
    useEffect(() => {
        const time = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonialData.length);
        }, 3000);

        return () => clearInterval(time);
    }, []);

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* <h3 className="text-black font-bold tracking-wide uppercase text-sm">
                    Testimonial
                </h3> */}
                <h3 className="text-4xl md:text-5xl font-bold mt-2 text-green-500 font-bebas">
                    What Client's Say
                </h3>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    We place huge value on strong relationships and have seen the benefit
                    they bring to our business. Customer feedback is vital in helping us
                    to get it right.
                </p>
            </div>

            <div className="mt-12 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {testimonialData.map((item, index) => (
                    <div key={index} className={` relative inset-0 transition-opacity duration-300 ease-in-out text-center ${index === current ? "opacity-100" : "opacity-50"
                        }`}>
                        <div className="bg-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center m-4">
                            <img src={item.img} alt={item.name} className="w-20 h-20 mb-4 rounded-full border-2 border-green-500 shadow-md -mt-12 object-cover" />
                            <p className="text-gray-700 italic text-sm mb-2 leading-relaxed">{item.msg}</p>
                            <h4 className="font-semibold text-green-700">{item.name}</h4>
                            <h4 className="text-gray-600 text-sm">{item.role}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}