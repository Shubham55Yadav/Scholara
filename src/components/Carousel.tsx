// src/components/Carousel.tsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "📝 Hire a Ghost Writer for Your Exams! 🎉",
    subtitle: "— Only a Fantasy!",
    bgImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&h=400&q=80",
  },
  {
    title: "🎓 Skip All Your Lectures and Still Graduate! 📚",
    subtitle: "— Only in Your Imagination!",
    bgImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&h=400&q=80",
  },
  {
    title: "🎉 Hire guys to mark attendance on your behalf 😂",
    subtitle: "— Just Kidding!",
    bgImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1600&h=400&q=80",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurrent((curr) => (curr + 1) % slides.length);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 mb-16">
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
        Trending Features
      </h3>
      
      <div className="relative h-[200px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800/40">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === current ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500 absolute w-full h-full`}
            style={{ display: index === current ? 'block' : 'none' }}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* Modern gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-indigo-950/40 to-slate-950/70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-16">
                <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="text-sm sm:text-lg text-slate-200 max-w-xl font-medium tracking-wide">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-slate-950/20 hover:bg-white/40 dark:hover:bg-slate-955/40 backdrop-blur-md p-2 rounded-full shadow-md text-white border border-white/20 transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 dark:bg-slate-950/20 hover:bg-white/40 dark:hover:bg-slate-955/40 backdrop-blur-md p-2 rounded-full shadow-md text-white border border-white/20 transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
