"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/lib/hooks";
import { useAppDispatch } from "@/app/lib/hooks";
import { upsertProfile } from "@/app/store/slices/profileSlice";
import SetupProfileSkeleton from "./skeletonProfileSetup";

const SKILLS_OPTIONS = [
  "Technical Writing",
  "Customer Service",
  "Event Management",
  "Creative Strategy",
  "Data Analysis",
  "Project Management",
  "Social Media",
  "Graphic Design",
  "Content Creation",
  "Marketing",
];

const SHIFTS = [
  { id: "mornings", label: "Mornings", icon: "🌅" },
  { id: "afternoons", label: "Afternoons", icon: "☀️" },
  { id: "evenings", label: "Evenings", icon: "🌙" },
  { id: "weekends", label: "Weekends", icon: "🗓️" },
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function SetupProfilePage() {
  const { isLoading, user } = useAppSelector((state) => state.AuthReducer);
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [shifts, setShifts] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  useEffect(() => {
    if (user?.profile) {
      setSummary(user.profile.summary || "");
      setSkills(user.profile.skills || []);
      setShifts(user.profile.shifts || []);
      setAvailability(user.profile.availability || []);
    }
  }, [user]);

  const toggleSkill = (s: string) =>
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const toggleShift = (s: string) =>
    setShifts((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const toggleDay = (d: string) =>
    setAvailability((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setNewSkill("");
      setShowSkillInput(false);
    }
  };
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    const payload = {
      name: user?.profile?.name || "New User",
      summary,
      skills,
      shifts,
      availability,
      avatarUrl: user?.profile?.avatarUrl,
    };

    const result = await dispatch(upsertProfile(payload));

    if (upsertProfile.fulfilled.match(result)) {
      router.push("/home");
    }
  };
  if (isLoading || !user) {
    return <SetupProfileSkeleton />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mt-10">
      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase whitespace-nowrap">
            Step 1 of 2: Professional Details
          </span>
          <div className="flex-1 h-1 bg-gray-200 rounded-full max-w-xs">
            <div className="h-1 bg-blue-600 rounded-full w-1/2" />
          </div>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
            50% Complete
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 md:grid-cols-[210px_1fr] gap-6">
        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col items-center text-center shadow-sm">
            <div className="relative mb-3">
              <div className="w-20 h-20  shadow">
                <img
                  className="rounded-xl"
                  src={user?.profile?.avatarUrl || ""}
                  alt=""
                />
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow hover:bg-blue-700 transition-colors">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <h2 className="text-base font-bold text-gray-900">
              Welcome, {user?.profile?.name}!
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
              We've successfully imported your basic details from your account.
              Let's curate your professional profile to match you with premium
              part-time roles.
            </p>
            <button className="mt-4 flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium transition-colors">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-5">
          {/* Professional Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-sm font-semibold text-gray-800">
                Professional Summary
              </h3>
            </div>
            <label className="block text-[11px] font-semibold tracking-widest text-gray-400 mb-2">
              YOUR EDITORIAL INTRO
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Strategic problem-solver with a background in digital curation and project management. Focused on high-impact, part-time consultancy roles that leverage 5+ years of experience in the creative sector."
              rows={4}
              className="w-full px-3.5 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-300 outline-none focus:border-blue-500 focus:bg-white transition-all resize-none leading-relaxed"
            />
            <p className="text-xs text-gray-400 italic mt-2">
              Tip: Recruiters for gig and part-time roles value specific
              availability mentioned alongside your core expertise.
            </p>
          </div>

          {/* Skills + Shifts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Core Skills */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-sm font-semibold text-gray-800">
                  Core Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer select-none bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
                {SKILLS_OPTIONS.filter((s) => !skills.includes(s)).map(
                  (skill) => (
                    <span
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer select-none border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      {skill}
                    </span>
                  ),
                )}
                {showSkillInput ? (
                  <div className="flex items-center gap-1">
                    <input
                      autoFocus
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      onBlur={() => {
                        if (!newSkill) setShowSkillInput(false);
                      }}
                      placeholder="Skill name..."
                      className="px-2.5 py-1 text-xs border border-blue-400 rounded-full outline-none w-28 focus:ring-2 ring-blue-100"
                    />
                    <button
                      onClick={addSkill}
                      className="text-blue-600 text-xs font-bold"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowSkillInput(true)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-gray-300 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
                  >
                    + Add Skill
                  </button>
                )}
              </div>
            </div>

            {/* Preferred Shifts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-800">
                  Preferred Shifts
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SHIFTS.map((shift) => (
                  <button
                    key={shift.id}
                    type="button"
                    onClick={() => toggleShift(shift.id)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border text-[11px] font-semibold tracking-widest transition-all
                      ${
                        shifts.includes(shift.id)
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-gray-50 text-gray-400 hover:border-blue-300 hover:text-blue-500"
                      }`}
                  >
                    <span className="text-lg mb-1">{shift.icon}</span>
                    {shift.label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exact Availability */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                </svg>
                <h3 className="text-sm font-semibold text-gray-800">
                  Exact Availability
                </h3>
              </div>
              <span className="text-[10px] font-semibold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                INTERACTIVE
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-[10px] font-semibold text-gray-400 tracking-wide">
                    {day}
                  </span>
                  <div
                    className={`w-full aspect-square rounded-xl flex items-center justify-center border-2 transition-all
                    ${
                      availability.includes(day)
                        ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-200"
                        : "bg-white border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {availability.includes(day) && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 flex-shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
              </svg>
              Tap specific days to mark yourself as available for on-demand
              assignments.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors">
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            {isLoading && (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {isLoading ? "Saving..." : "Save and Continue"}
          </button>
        </div>
      </div>

      {/* Step nav */}
      {/* <div className="bg-white border-t border-gray-100 px-6 py-3">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-2">
          {[
            { label: "Setup", active: true },
            { label: "Connections", active: false },
            { label: "Verification", active: false },
            { label: "Finalize", active: false },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step.active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {i + 1}
              </div>
              <span
                className={`text-[10px] font-semibold tracking-widest uppercase ${step.active ? "text-blue-600" : "text-gray-400"}`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
