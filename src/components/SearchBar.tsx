import React, { useState } from "react";
import subjects from "../data/subjects";

interface SearchBarProps {
  onSearch: (subjectCode: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      const filteredSuggestions = Object.keys(subjects).filter(
        (key) =>
          key.toLowerCase().includes(value.toLowerCase()) ||
          subjects[key].name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (subjectCode: string) => {
    setQuery(subjectCode);
    setSuggestions([]);
    onSearch(subjectCode);
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-8">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by subject code or name (e.g., CSE3003, Physics)"
        className="w-full px-5 py-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-full w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl mt-2 z-10 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto">
          {suggestions.map((code) => (
            <li
              key={code}
              onClick={() => handleSuggestionClick(code)}
              className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer text-slate-700 dark:text-slate-350 transition-colors text-sm sm:text-base flex items-center justify-between"
            >
              <span className="font-bold text-indigo-650 dark:text-indigo-400">{code}</span>
              <span className="truncate ml-4 text-xs sm:text-sm font-medium">{subjects[code].name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
