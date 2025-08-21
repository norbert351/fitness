"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
//   ctaText: string;
//   ctaLink: string;
};

const  HeroSlider = () =>{
    const slides: Slide[] = [
    {
      id: 1,
      title: "Where Hard Work Meets Success",
      subtitle: "Transform Your Body",
      desc: "For body building, weight loss, and muscle toning - we're at your service. Our trainers will help you achieve your goals.",
      image: "/gym.jpg",
    //   ctaText: "Get Started",
    //   ctaLink: "/membership"
    },
        {
      id: 2,
      title: "Premium Fitness Facilities",
      subtitle: "State-of-the-Art Equipment",
      desc: "Train with the best equipment in a motivating environment designed for maximum results.",
      image: "/gym1.jpg",
    //   ctaText: "View Facilities",
    //   ctaLink: "/facilities"
    },
]
  
      const [currentSlide, setCurrentSlide] = useState(0)

          useEffect(()=>{
      const interval = setInterval(  
        ()=>setCurrentSlide((prev) => (prev ===slides.length -1 ? 0 : prev + 1)),
      6000);
      return () => clearInterval(interval);
    },[])

     const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

    return (
        <div className="">
             <div className="relative h-screen w-full flex items-center justify-center">
                <Image src={slides[currentSlide].image}
                alt="Background"
                fill
                style={{objectFit: "cover"}}
                />

                <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative items-center justify-center text-amber-50 flex-col">
                <h1 className="h1 text-center text-white lg:text-left mb-2 text-7xl font-bold rel">
                    {slides[currentSlide].title}
                </h1>
                <p className="text-white italic text-center lg:text-left mb-4">
                  {slides[currentSlide].desc}
                </p>

                 <Link href="/price"> <button className="text-white bg-teal-500 font-bold hover:bg-teal-200 rounded-full px-6 py-2 items-center justify-center">
            Book Session</button></Link>
                </div>

                
          {/* Navigation Arrows */}
          <div className="absolute flex bottom-8 items-center justify-center lg:justify-start gap-4 mt-8 lg:mt-12">
            <button
              onClick={prevSlide}
              className="text-white bg-red-500 hover:bg-red-300 rounded-full p-4 transition-all duration-300"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="text-white bg-red-500 hover:bg-red-300 rounded-full p-4 transition-all duration-300"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
             </div>
        </div>
    )
}
export default HeroSlider