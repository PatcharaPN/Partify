"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";

const SKILLS_OPTIONS = [
  "Copy Editing",
  "SEO Strategy",
  "Proofreading",
  "Ghostwriting",
  "CMS Management",
  "Interviewing",
  "Fact Checking",
  "Content Strategy",
  "Social Media",
  "Copywriting",
  "Video Editing",
  "Podcast Production",
];

const EXPERIENCE_OPTIONS = [
  "Barista",
  "Content Writer",
  "Copywriter",
  "Social Media Admin",
  "Video Editor",
  "Graphic Designer",
  "Photographer",
  "Podcast Producer",
  "Interviewer",
  "Proofreader",
  "Translator",
  "Data Entry",
  "Customer Service",
  "Sales Assistant",
  "Event Staff",
];
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function BuildProfilePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Copy Editing",
    "SEO Strategy",
    "Proofreading",
  ]);
  const [experienceSearch, setExperienceSearch] = useState("");
  const [selectedExpereince, setSelectedExpereince] = useState<string[]>([
    "Graphic Designer",
    "Photographer",
    "Podcast Producer",
    "Interviewer",
  ]);
  const [skillSearch, setSkillSearch] = useState("");
  const [activeDays, setActiveDays] = useState<boolean[]>([
    true,
    true,
    false,
    true,
    true,
    false,
    false,
  ]);
  const [summary, setSummary] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector(
    (state) => state.profileReducer,
  );

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 6) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const toggleExperience = (skill: string) => {
    if (selectedExpereince.includes(skill)) {
      setSelectedExpereince(selectedExpereince.filter((s) => s !== skill));
    } else if (selectedExpereince.length < 6) {
      setSelectedExpereince([...selectedExpereince, skill]);
    }
  };

  const toggleDay = (i: number) => {
    const updated = [...activeDays];
    updated[i] = !updated[i];
    setActiveDays(updated);
  };

  const filteredSkills = SKILLS_OPTIONS.filter(
    (s) =>
      !selectedSkills.includes(s) &&
      s.toLowerCase().includes(skillSearch.toLowerCase()),
  );

  const filteredExperience = EXPERIENCE_OPTIONS.filter(
    (s) =>
      !selectedExpereince.includes(s) &&
      s.toLowerCase().includes(experienceSearch.toLowerCase()),
  );

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-sans">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Build Your Professional Identity
          </h1>
          <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">
            Create a profile that stands out to top editorial and creative
            teams. Your summary and skills help us match you with the right
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-[200px_1fr] gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Photo Upload Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                {photoPreview ? (
                  <img
                    src={photoPreview || ""}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={profile?.avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-sm">
                  Profile Photo
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                  Upload a clear, professional photo to increase your
                  visibility.
                </p>
              </div>
              <label className="cursor-pointer w-full">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
                <span className="block text-center text-sm font-medium text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition">
                  Upload Photo
                </span>
              </label>
            </div>

            {/* Expert Tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2">
                <Icon
                  icon="ph:lightning-fill"
                  className="text-blue-500 text-base"
                />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  Expert Tip
                </span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                "Users with a detailed professional summary are 3x more likely
                to be contacted by hiring managers."
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            {/* Professional Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-base mb-1">
                Professional Summary
              </h2>
              <p className="text-xs text-gray-400 mb-3">
                Briefly describe your editorial background, expertise, and what
                you're looking for in your next role.
              </p>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="e.g. Senior Copy Editor with 8+ years experience in lifestyle journalism..."
                className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            {/* Top Skills */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-base mb-0.5">
                Experiences
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Select up to 6 Job that define your core expertise.
              </p>

              {/* Selected Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedExpereince.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleExperience(skill)}
                    className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
                  >
                    {skill}
                    <Icon icon="mdi:close" className="text-sm opacity-80" />
                  </button>
                ))}
                {filteredExperience
                  .filter((s) => !selectedExpereince.includes(s))
                  .slice(0, 4)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleExperience(skill)}
                      disabled={selectedSkills.length >= 6}
                      className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {skill}
                      <Icon icon="mdi:plus" className="text-sm" />
                    </button>
                  ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"
                />
                <input
                  type="text"
                  placeholder="Search or add more Expereince..."
                  value={experienceSearch}
                  onChange={(e) => setExperienceSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              {/* Search results */}
              {experienceSearch && filteredExperience.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filteredExperience.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        toggleSkill(skill);
                        setSkillSearch("");
                      }}
                      disabled={selectedSkills.length >= 6}
                      className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
                    >
                      {skill}
                      <Icon icon="mdi:plus" className="text-sm" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Experience & Availability */}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-base mb-0.5">
                Top Skills
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Select up to 6 skills that define your core expertise.
              </p>

              {/* Selected Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
                  >
                    {skill}
                    <Icon icon="mdi:close" className="text-sm opacity-80" />
                  </button>
                ))}
                {filteredSkills
                  .filter((s) => !selectedSkills.includes(s))
                  .slice(0, 4)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      disabled={selectedSkills.length >= 6}
                      className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {skill}
                      <Icon icon="mdi:plus" className="text-sm" />
                    </button>
                  ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"
                />
                <input
                  type="text"
                  placeholder="Search or add more skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              {/* Search results */}
              {skillSearch && filteredSkills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        toggleSkill(skill);
                        setSkillSearch("");
                      }}
                      disabled={selectedSkills.length >= 6}
                      className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
                    >
                      {skill}
                      <Icon icon="mdi:plus" className="text-sm" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Weekly Availability */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-900 text-base">
                  Weekly Availability
                </h2>
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">
                  Part-Time Preferred
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                When are you typically available for assignments?
              </p>

              {/* Day toggles */}
              <div className="flex justify-between mb-5">
                {DAYS.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      {day}
                    </span>
                    <button
                      onClick={() => toggleDay(i)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                        activeDays[i]
                          ? "bg-[#2563EB] text-white shadow-blue-200"
                          : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {activeDays[i] ? (
                        <Icon icon="mdi:check" className="text-base" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Work Hours & Timezone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50">
                  <Icon
                    icon="mdi:clock-outline"
                    className="text-gray-400 text-base"
                  />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Work Hours
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      15 – 20 hours / week
                    </p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50">
                  <Icon icon="mdi:earth" className="text-gray-400 text-base" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Timezone
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      GMT -05:00 (EST)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-end items-center mt-8">
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md shadow-blue-200">
            Save
            <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </main>
    </div>
  );
}
