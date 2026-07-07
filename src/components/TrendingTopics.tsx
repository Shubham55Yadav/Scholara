// src/components/TrendingTopics.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface Discussion {
  id: string;
  title: string;
  repliesCount: number;
}

interface TrendingTopicsProps {
  topics: Discussion[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 tracking-tight">Trending Topics</h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Most discussed issues right now</p>
      <ul className="mt-5 space-y-3 flex-1">
        {topics.map((topic, index) => (
          <li key={topic.id} className="flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 mr-3 flex-shrink-0">
              #{index + 1}
            </span>
            <Link
              to={`/discussion/${topic.id}`}
              className="text-slate-750 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-semibold truncate hover:underline"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;