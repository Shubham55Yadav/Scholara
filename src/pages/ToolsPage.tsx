import React, { useState } from "react";
import ToolCard from "../components/ToolCard";

const toolsData = [
  {
    image: "../../images/1.png", 
    title: "CGPA Calculator",
    description: "Calculate your CGPA easily with our advanced calculator tool.",
    linkText: "Calculate Now",
    linkUrl: "#",
  },
  {
    image: "../../images/2.png", 
    title: "Grade Predictor",
    description: "Predict your potential grades based on historical data.",
    linkText: "Predict Grades",
    linkUrl: "#",
  },
  {
    image: "../../images/3.png", 
    title: "Teacher Rating",
    description: "View and submit anonymous feedback for professors.",
    linkText: "Rate Teachers",
    linkUrl: "#",
  },
  {
    image: "../../images/4.png", 
    title: "Project Collaboration",
    description: "Find teammates for your academic projects.",
    linkText: "Find Partners",
    linkUrl: "#",
  },
  {
    image: "../../images/4.png", 
    title: "Time Table Planner",
    description: "Plan your weekly timetable effectively with this tool.",
    linkText: "Plan Timetable",
    linkUrl: "#",
  },
  {
    image: "../../images/3.png", 
    title: "Exam Scheduler",
    description: "Schedule and track your exams with ease.",
    linkText: "Schedule Exams",
    linkUrl: "#",
  },
];

const ToolsPage: React.FC = () => {
  const [toolsToShow, setToolsToShow] = useState(4); // Show initial tools

  const handleLoadMore = () => {
    setToolsToShow((prev) => Math.min(prev + 4, toolsData.length)); // Load 4 more tools or show all
  };

  return (
    <div className="min-h-screen py-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-250/50 dark:border-indigo-850/40 mb-4 uppercase tracking-wider">
            🛠️ Utilities
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">Academic Tools</h1>
          <p className="text-slate-650 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Explore a variety of tools designed to streamline and enhance your academic workflow, from calculators to calculators and planner tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {toolsData.slice(0, toolsToShow).map((tool, index) => (
            <ToolCard
              key={index}
              image={tool.image}
              title={tool.title}
              description={tool.description}
              linkText={tool.linkText}
              linkUrl={tool.linkUrl}
            />
          ))}
        </div>

        {/* Load More Button */}
        {toolsToShow < toolsData.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-sm hover:shadow"
            >
              Load More Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
