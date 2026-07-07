// src/pages/FFCSHelp.tsx

import React, { useState } from "react";
import { Plus, X, Save } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  credits: string;
  slots: string[];
  venue: string;
  color: string;
}

const slotMapping: { [day: string]: string[] } = {
  Monday: ["A11", "B11", "C11", "A21", "A14", "B21", "C21"],
  Tuesday: ["D11", "E11", "F11", "D21", "E14", "B22", "F21"],
  Wednesday: ["A12", "B12", "C12", "A22", "B14", "B22", "A24"],
  Thursday: ["D12", "E12", "F12", "D22", "F14", "D22", "F22"],
  Friday: ["A13", "B13", "C13", "A23", "C14", "B24", "C21"],
  Saturday: ["D13", "E13", "F13", "D23", "D14", "D24", "E23"],
};

const validSlots = Object.values(slotMapping).flat();
const periods = [
  "8:30 - 10:00",
  "10:05 - 11:40",
  "11:45 - 1:15",
  "1:15 - 2:45",
  "2:50 - 4:00",
  "4:05 - 5:55",
  "6:00 - 7:30",
];

const FFCSHelp = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCredits, setTotalCredits] = useState(0);

  const [courseInput, setCourseInput] = useState({
    code: "",
    name: "",
    faculty: "",
    credits: "",
    slots: "",
    venue: "",
  });

  // Handle form input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCourseInput({ ...courseInput, [name]: value });
  };

  const getOccupiedSlots = () => courses.flatMap((course) => course.slots);

  const validateInputs = () => {
    const { code, name, faculty, credits, slots, venue } = courseInput;
    if (!code.trim() || !name.trim() || !faculty.trim() || !credits.trim() || !slots.trim() || !venue.trim()) {
      alert("Please fill out all fields.");
      return false;
    }
    const creditValue = parseInt(credits, 10);
    if (isNaN(creditValue) || creditValue < 1 || creditValue > 5) {
      alert("Credits must be between 1 and 5.");
      return false;
    }
    const slotList = slots.split(",").map((s) => s.trim());
    for (const slot of slotList) {
      if (!validSlots.includes(slot)) {
        alert(`Invalid slot: ${slot}. Must be e.g. A11, B12, etc.`);
        return false;
      }
    }
    return true;
  };

  const addCourse = () => {
    if (!validateInputs()) return;
    const { code, name, faculty, credits, slots, venue } = courseInput;
    const newSlots = slots.split(",").map((s) => s.trim());
    const occupiedSlots = getOccupiedSlots();
    const conflicting = newSlots.filter((s) => occupiedSlots.includes(s));
    if (conflicting.length > 0) {
      alert("These slots already occupied: " + conflicting.join(", "));
      return;
    }
    const newCourse: Course = {
      id: Date.now().toString(),
      code,
      name,
      faculty,
      credits,
      slots: newSlots,
      venue,
      color: "#4f46e5", // Modern indigo accent by default
    };
    setCourses([...courses, newCourse]);
    setTotalCredits(totalCredits + parseInt(credits));
    setCourseInput({
      code: "",
      name: "",
      faculty: "",
      credits: "",
      slots: "",
      venue: "",
    });
  };

  const removeCourse = (id: string) => {
    const c = courses.find((course) => course.id === id);
    if (!c) return;
    setCourses(courses.filter((course) => course.id !== id));
    setTotalCredits(totalCredits - parseInt(c.credits));
  };

  const handleColorChange = (id: string, color: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, color } : c))
    );
  };

  const handleTimetableColorChange = (id: string, color: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, color } : c))
    );
  };

  const renderTimetableCell = (slot: string) => {
    const c = courses.find((course) => course.slots.includes(slot));
    if (!c) {
      return (
        <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded h-[36px] flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/30" />
      );
    }
    return (
      <div
        className="h-[36px] rounded flex items-center justify-center cursor-pointer hover:brightness-95 active:scale-95 transition-all shadow-sm"
        style={{ backgroundColor: c.color }}
        onClick={() => {
          const newColor = prompt("New color (#hex):", c.color);
          if (newColor && /^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
            handleTimetableColorChange(c.id, newColor);
          }
        }}
      >
        <p className="text-white text-xs font-bold text-center">
          {c.code}
        </p>
      </div>
    );
  };

  // Save timetable as PDF
  const saveTimetable = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const timetableEl = document.getElementById("timetable");
    const selectedEl = document.getElementById("selected-courses");
    if (!timetableEl || !selectedEl) return;

    const canvas1 = await html2canvas(timetableEl, { scale: 2 });
    const data1 = canvas1.toDataURL("image/png");
    const pdfW = pdf.internal.pageSize.getWidth();
    const props1 = pdf.getImageProperties(data1);
    const h1 = (props1.height * pdfW) / props1.width;
    pdf.addImage(data1, "PNG", 0, 0, pdfW, h1);

    if (h1 > pdf.internal.pageSize.getHeight()) pdf.addPage();

    const canvas2 = await html2canvas(selectedEl, { scale: 2 });
    const data2 = canvas2.toDataURL("image/png");
    const props2 = pdf.getImageProperties(data2);
    const h2 = (props2.height * pdfW) / props2.width;
    const yOffset = h1 + 10 > pdf.internal.pageSize.getHeight() ? 10 : h1 + 10;
    pdf.addImage(data2, "PNG", 0, yOffset, pdfW, h2);

    pdf.save("timetable.pdf");
  };

  return (
    <div className="min-h-screen py-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-250/50 dark:border-indigo-850/40 mb-4 uppercase tracking-wider">
            📅 Registration Helper
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">
            FFCS Timetable Creator
          </h1>
          <p className="text-slate-655 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Draft and plan your upcoming semester timetable clash-free before official registrations begin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Course form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-5 h-fit">
            <h2 className="text-xl font-bold text-slate-850 dark:text-slate-100">
              Add a Course
            </h2>
            <div className="text-sm space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Course Code</label>
                <input
                  name="code"
                  value={courseInput.code}
                  onChange={handleInputChange}
                  placeholder="e.g. CSE3003"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Course Name</label>
                <input
                  name="name"
                  value={courseInput.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineering"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Faculty Name</label>
                <input
                  name="faculty"
                  value={courseInput.faculty}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Credits</label>
                  <select
                    name="credits"
                    value={courseInput.credits}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="" className="dark:bg-slate-900">Select</option>
                    {[1, 2, 3, 4, 5].map((c) => (
                      <option key={c} value={c} className="dark:bg-slate-900">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Venue</label>
                  <input
                    name="venue"
                    value={courseInput.venue}
                    onChange={handleInputChange}
                    placeholder="e.g. SJT403"
                    className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-slate-700 dark:text-slate-350 text-xs uppercase tracking-wider">Slots (Comma Separated)</label>
                <input
                  name="slots"
                  value={courseInput.slots}
                  onChange={handleInputChange}
                  placeholder="e.g. A11, B12"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <p className="text-[10px] mt-1.5 text-slate-500 dark:text-slate-450 leading-relaxed font-mono">
                  Occupied: {getOccupiedSlots().join(", ") || "None"}
                </p>
              </div>
              
              <button
                onClick={addCourse}
                className="w-full mt-2 bg-indigo-600 text-white py-3 rounded-xl flex items-center justify-center hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors font-bold text-sm shadow-sm"
              >
                <Plus className="h-4.5 w-4.5 mr-1.5" />
                Add Course to Grid
              </button>
            </div>
          </div>

          {/* Timetable visualizer */}
          <div className="lg:col-span-2 space-y-8">
            <div id="timetable" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-slate-850 dark:text-slate-100">
                  Weekly Schedule
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold text-slate-550 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    Total Credits: {totalCredits}
                  </span>
                  <button
                    onClick={saveTimetable}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition flex items-center gap-1.5 font-bold text-xs shadow-sm"
                  >
                    <Save className="h-4 w-4" />
                    Save PDF
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="table-fixed w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-850/50">
                      <th className="px-3 py-3 w-20 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                        Day
                      </th>
                      {periods.map((p, idx) => (
                        <th
                          key={idx}
                          className="px-2 py-3 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800"
                        >
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {Object.entries(slotMapping).map(([day, slots]) => (
                      <tr key={day} className="hover:bg-slate-50/20 dark:hover:bg-slate-850/10">
                        <td className="px-3 py-4 font-bold text-slate-850 dark:text-slate-200 whitespace-nowrap">
                          {day}
                        </td>
                        {slots.map((slot) => (
                          <td key={slot} className="px-1.5 py-4">
                            {renderTimetableCell(slot)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Courses listing */}
            <div
              id="selected-courses"
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-850 dark:text-slate-100 mb-6">
                Selected Courses
              </h2>
              <div className="space-y-4">
                {courses.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
                    No courses added yet. Fill the left form to select slots.
                  </p>
                )}
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-50 dark:bg-slate-850/40 border border-slate-200/50 dark:border-slate-800/40 p-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Color</label>
                        <input
                          type="color"
                          value={course.color}
                          onChange={(e) => handleColorChange(course.id, e.target.value)}
                          className="w-7 h-7 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer bg-transparent"
                        />
                      </div>
                      <div className="text-xs sm:text-sm min-w-0">
                        <h3 className="font-bold text-slate-850 dark:text-slate-100 truncate">{course.code}: {course.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 truncate">
                          {course.faculty} • <span className="font-semibold text-indigo-650 dark:text-indigo-400">{course.credits} Credits</span> • Slots: {course.slots.join(", ")} • Venue: {course.venue}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-455 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Remove Course"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FFCSHelp;
