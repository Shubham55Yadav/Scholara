// src/components/Updates.tsx

import React from 'react';
import { Bell, Smartphone, ArrowRight } from 'lucide-react';

const Updates = () => {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-950/45 border-y border-slate-200/50 dark:border-slate-900/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold text-slate-850 dark:text-slate-100 mb-8 tracking-tight">Latest Updates</h3>

        {/* Make the cards appear in a row on small screens */}
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
          <UpdateCard
            tag="New"
            icon={<Bell className="h-5 w-5" />}
            title="Enhanced FFCS Interface"
            description="Experience our newly redesigned course registration helper system with improved features and user experience."
          />

          <UpdateCard
            tag="Update"
            icon={<Smartphone className="h-5 w-5" />}
            title="Mobile Web Support"
            description="Access your academic resources on the go with fully optimized layouts. Bookmark to home screen."
          />
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold transition-colors text-sm md:text-base">
            View all updates
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateCard = ({
  tag,
  icon,
  title,
  description,
}: {
  tag: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex-1">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div
          className={`p-2.5 rounded-xl ${
            tag === 'New' 
              ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400' 
              : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-455'
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <span
          className={`inline-block px-2.5 py-0.5 text-xs rounded-lg font-semibold mb-3 ${
            tag === 'New' 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' 
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
          }`}
        >
          {tag}
        </span>
        <h4 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-2 truncate">
          {title}
        </h4>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{description}</p>
        <button className="text-indigo-650 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold inline-flex items-center text-xs sm:text-sm transition-colors">
          Learn more
          <ArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default Updates;
