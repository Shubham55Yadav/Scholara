// src/components/Hero.tsx

import React, { useState } from "react";
import { Search } from "lucide-react";
import BackgroundDiv from "./BackgroundDiv";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate("/resources", { state: { searchQuery: query } });
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <BackgroundDiv imageUrl="/images/bleback.jpg">
      <div className="w-full h-full bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm py-16 sm:py-20 transition-colors duration-300 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="py-2">
            <div className="max-w-4xl mx-auto text-center mb-10 px-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/40 mb-4 uppercase tracking-wider">
                🎓 Scholara Academic Platform
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 leading-tight tracking-tight font-sans">
                All Your Modules, Notes, Question Papers
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  Just One Click Away
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto font-medium">
                Crack exams, smash grades, and access peer-shared resources effortlessly.
              </p>
            </div>

            <div className="max-w-3xl mx-auto px-4">
              {/* Search Bar Container */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="../../images/study.svg"
                  alt="Study"
                  className="h-12 w-12 flex-shrink-0 hidden sm:block dark:opacity-80 dark:invert-[0.1]"
                />
                <div className="flex-1 w-full flex items-stretch bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for course code, subject or topics..."
                    className="w-full py-4 px-5 bg-transparent focus:outline-none text-slate-800 dark:text-slate-150 text-sm sm:text-base focus:ring-0"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-indigo-600 text-white px-6 py-4 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center whitespace-nowrap gap-2 font-semibold"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">
                      Search Hub
                    </span>
                  </button>
                </div>
                <img
                  src="../../images/comment.svg"
                  alt="Comment"
                  className="h-12 w-12 flex-shrink-0 hidden sm:block dark:opacity-80 dark:invert-[0.1]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundDiv>
  );
};

export default Hero;
