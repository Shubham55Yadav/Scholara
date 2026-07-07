import React from 'react';

const StudyMaterials = () => {
  return (
    <div className="py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-850 dark:text-slate-100 mb-4 tracking-tight leading-tight">
              Find all relevant study materials for your courses
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
              Access a comprehensive, curated library of course materials, lecture notes, and previous semester study guides contributed by peers.
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 font-semibold transition-all shadow-sm">
                Get Started
              </button>
              <button className="border border-slate-250 dark:border-slate-850 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-semibold">
                Learn More
              </button>
            </div>
          </div>
          
          <div>
            <img
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
              alt="Study Materials"
              className="rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/40 w-full max-h-[320px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;