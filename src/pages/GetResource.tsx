import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import subjects from "../data/subjects";
import { ArrowLeft, Download, Folder, FileText, User } from "lucide-react";

interface Resource {
  id: number;
  name: string;
  file: string;
}

const GetResources: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<keyof typeof subjects[string]["folders"] | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);

  const handleSearch = (subjectCode: string) => {
    if (subjects[subjectCode]) {
      setSelectedSubject(subjectCode);
      setSelectedFolder(null);
      setSelectedTeacher(null);
    } else {
      alert("No resources found for the entered subject.");
    }
  };

  const handleFolderClick = (folderName: keyof typeof subjects[string]["folders"]) => {
    setSelectedFolder(folderName);
    setSelectedTeacher(null);
  };

  const handleTeacherClick = (teacherName: string) => {
    setSelectedTeacher(teacherName);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setSelectedTeacher(null);
  };

  const handleBackToTeachers = () => {
    setSelectedTeacher(null);
  };

  return (
    <div className="min-h-screen py-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-250/50 dark:border-indigo-850/40 mb-4 uppercase tracking-wider">
            📚 Resource Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">Get Resources</h1>
          <p className="text-slate-650 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Search for your subject modules to view teacher notes, assignments, tips, and previous semester test papers.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* Display Resources for Selected Subject */}
        {selectedSubject && !selectedFolder && (
          <div className="mt-16 border-t border-slate-200/60 dark:border-slate-850 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100">
                Resources for <span className="text-indigo-600 dark:text-indigo-400">{subjects[selectedSubject].name}</span> ({selectedSubject})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.keys(subjects[selectedSubject].folders).map((folderName) => (
                <div
                  key={folderName}
                  onClick={() => handleFolderClick(folderName as keyof typeof subjects[string]["folders"])}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-900 transition-all cursor-pointer group flex items-start gap-4"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                    <Folder className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{folderName}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Browse repository files</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Teachers for Selected Folder */}
        {selectedSubject && selectedFolder && !selectedTeacher && (
          <div className="mt-16 border-t border-slate-200/60 dark:border-slate-850 pt-12">
            <button
              onClick={handleBackToFolders}
              className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-300 font-semibold mb-6 text-sm group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Folders</span>
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100 mb-8">
              {selectedFolder} - Teachers
            </h2>
            {["Teacher Materials", "Assignments"].includes(selectedFolder) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.keys(
                  subjects[selectedSubject].folders[selectedFolder] as Record<string, Resource[]>
                ).map((teacherName) => (
                  <div
                    key={teacherName}
                    onClick={() => handleTeacherClick(teacherName)}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-900 transition-all cursor-pointer group flex items-start gap-4"
                  >
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {teacherName}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">View teacher uploads</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-8 rounded-2xl text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  This folder does not contain teacher-specific subgroups.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Display Resources for Selected Teacher */}
        {selectedSubject && selectedFolder && selectedTeacher && (
          <div className="mt-16 border-t border-slate-200/60 dark:border-slate-850 pt-12">
            <button
              onClick={handleBackToTeachers}
              className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-300 font-semibold mb-6 text-sm group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Teachers</span>
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100 mb-8">
              {selectedFolder} - {selectedTeacher}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(subjects[selectedSubject].folders[selectedFolder] as Record<string, Resource[]>)[
                selectedTeacher
              ].map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full hover:shadow transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 leading-tight">
                      {resource.name}
                    </h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <a
                      href={resource.file}
                      download
                      className="inline-flex items-center justify-center gap-1.5 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Resource
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Resources for Non-Teacher-Specific Folders */}
        {selectedSubject &&
          selectedFolder &&
          !["Teacher Materials", "Assignments"].includes(selectedFolder) && (
            <div className="mt-16 border-t border-slate-200/60 dark:border-slate-850 pt-12">
              <button
                onClick={handleBackToFolders}
                className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-300 font-semibold mb-6 text-sm group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Folders</span>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-850 dark:text-slate-100 mb-8">
                {selectedFolder} - Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(
                  subjects[selectedSubject].folders[selectedFolder] as Resource[]
                ).map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full hover:shadow transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 leading-tight">
                        {resource.name}
                      </h3>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={resource.file}
                        download
                        className="inline-flex items-center justify-center gap-1.5 w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Resource
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default GetResources;
