// src/components/RecentDiscussions.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { MessageSquare, Clock } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  description: string;
  repliesCount: number;
  createdAt: Timestamp | null;
}

interface RecentDiscussionsProps {
  discussions: Discussion[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const RecentDiscussions: React.FC<RecentDiscussionsProps> = ({
  discussions,
  onLoadMore,
  hasMore,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-850 dark:text-slate-100 tracking-tight mb-6">Recent Discussions</h3>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {discussions.map((discussion) => (
          <li key={discussion.id} className="py-4 first:pt-0 last:pb-0">
            <Link to={`/discussion/${discussion.id}`} className="block group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-150 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {discussion.title}
                </h4>
                <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {discussion.createdAt
                      ? discussion.createdAt.toDate().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
                      : 'Just now'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mt-2">
                <p className="text-slate-655 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 max-w-3xl leading-relaxed">
                  {discussion.description}
                </p>
                <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200/50 dark:border-slate-750 flex-shrink-0">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                  {discussion.repliesCount} replies
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            onClick={onLoadMore}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
          >
            Load More Discussions
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentDiscussions;