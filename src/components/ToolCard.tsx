import React from "react";

interface ToolCardProps {
  image: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ image, title, description, linkText, linkUrl }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative group overflow-hidden h-44">
        <img src={image} alt={title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed flex-1">{description}</p>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <a
            href={linkUrl}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors"
          >
            <span>{linkText}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
