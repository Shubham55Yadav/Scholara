// src/components/QuickLinks.tsx

import React from "react";
import { Calendar, Book, Users, HelpCircle, Search } from "lucide-react";

const QuickLinks = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 transition-colors duration-300">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Links Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-850 dark:text-slate-100 mb-6 tracking-tight">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickLink icon={<Calendar className="text-indigo-600 dark:text-indigo-400" />} text="Academic Calendar" />
            <QuickLink icon={<Book className="text-indigo-600 dark:text-indigo-400" />} text="Course Catalog" />
            <QuickLink icon={<Users className="text-indigo-600 dark:text-indigo-400" />} text="Faculty Directory" />
            <QuickLink icon={<HelpCircle className="text-indigo-600 dark:text-indigo-400" />} text="FAQs" />
          </div>
        </div>

        {/* Quick Course Search & Resources Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-slate-850 dark:text-slate-100 mb-6 tracking-tight">
            Quick Course Search
          </h3>
          <div className="space-y-6">
            {/* Updated Search Bar */}
            <div className="relative">
              <form action="/resources" method="get">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter course code or name..."
                  className="w-full pl-12 pr-4 py-3 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 dark:text-slate-150 text-sm sm:text-base placeholder-slate-400"
                />
              </form>
            </div>

            {/* Popular Courses */}
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-base">Popular Courses</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                Access modules, exams, and expert tips for these top-searched modules:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-1 rounded-lg text-xs transition-colors">
                  CSE3003
                </span>
                <span className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-1 rounded-lg text-xs transition-colors">
                  MAT1014
                </span>
                <span className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-1 rounded-lg text-xs transition-colors">
                  PHY1001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickLink = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <a href="#" className="flex items-center space-x-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent hover:border-slate-150 dark:hover:border-slate-800/80 transition-all group">
    <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-colors">
      {icon}
    </div>
    {/* Hide text on mobile, show on tablet and above */}
    <span className="text-slate-700 dark:text-slate-350 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-semibold text-sm sm:inline">
      {text}
    </span>
  </a>
);

export default QuickLinks;
