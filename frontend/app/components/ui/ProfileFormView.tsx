"use client";

import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";
import { Profile } from "@/app/types/job.type";

import { Icon } from "@iconify/react";

type ProfileFormActions = {
  setName: (v: string) => void;
  setPhone: (v: string) => void;
  setBirthDate: (v: string) => void;
  setSummary: (v: string) => void;
  setExperience: (v: string[]) => void;
  setSkills: (v: string[]) => void;
  setAvailability: (v: string[]) => void;
  toggleSkill: (v: string) => void;
  toggleExperience: (v: string) => void;
  toggleDay: (v: string) => void;
  setSkillSearch: (v: string) => void;
  setExperienceSearch: (v: string) => void;
  setAvatarPreview: (url: string) => void;
  uploadAvatar: (file: File) => Promise<void>;
  save: () => Promise<void>;
};

type ProfileFormState = {
  name: string;
  phone: string;
  birthDate: string;
  summary: string;
  skills: string[];
  experience: string[];
  availability: string[];
  avatarUrl?: string;
  avatarPreview?: string;
  skillSearch: string;
  experienceSearch: string;
};
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type ProfileFormProps = {
  profile?: Profile;

  state: ProfileFormState;
  actions: ProfileFormActions;

  mode?: "setup" | "edit";
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  onSuccess?: () => void;
};
export default function ProfileForm({
  mode = "edit",
  actions,
  state,
  profile,
  onSuccess,
}: ProfileFormProps) {
  const EXPERIENCE_OPTIONS = Object.keys(EXPERIENCE_SKILL_MAP).sort();

  const toggleExperience = (skill: string) => {
    const exist = state.experience.includes(skill);
    const updated = exist
      ? state.experience.filter((s) => s !== skill)
      : state.experience.length < 6
        ? [...state.experience, skill]
        : state.experience;

    actions.setExperience(updated);
  };
  const availableSkills = Array.from(
    new Set(state.experience.flatMap((exp) => EXPERIENCE_SKILL_MAP[exp] || [])),
  );
  const SKILL_OPTIONS = Array.from(
    new Set(Object.values(EXPERIENCE_SKILL_MAP).flat()),
  ).sort();
  const filteredExperience = EXPERIENCE_OPTIONS.filter(
    (s) =>
      !state.experience.includes(s) &&
      s.toLowerCase().includes(state.experienceSearch.toLowerCase()),
  );
  const filteredSkills = availableSkills.filter(
    (s) =>
      !state.skills.includes(s) &&
      s.toLowerCase().includes(state.skillSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F5F6FA] font-sans">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {mode === "edit" ? (
          <div>
            {" "}
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
          </div>
        ) : (
          <div className="bg-white border-b mb-5 border-gray-200 px-6 py-3">
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
        )}

        <div className="grid grid-cols-[200px_1fr] gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Photo Upload Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                <img
                  src={
                    state.avatarPreview ||
                    state.avatarUrl ||
                    profile?.avatarUrl ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
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
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const previewUrl = URL.createObjectURL(file);

                    // 1. set preview
                    actions.setAvatarPreview(previewUrl);

                    // 2. upload (ถ้ามีจริงใน actions)
                    await actions.uploadAvatar(file);
                  }}
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
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 text-base mb-4">
                ข้อมูลส่วนตัว
              </h2>
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    ชื่อ-นามสกุล <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.name}
                    onChange={(e) => actions.setName(e.target.value)}
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    value={state.phone}
                    onChange={(e) => actions.setPhone(e.target.value)}
                    placeholder="เช่น 081-234-5678"
                    className="w-full px-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    วันเกิด
                  </label>
                  <input
                    type="date"
                    value={state.birthDate}
                    onChange={(e) => actions.setBirthDate(e.target.value)}
                    className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                  />
                </div>
              </div>
            </div>
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
                className="w-full"
                rows={4}
                value={state.summary}
                onChange={(e) => actions.setSummary(e.target.value)}
                placeholder="Write something about yourself..."
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
                {state.experience.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => actions.toggleExperience(skill)}
                    className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
                  >
                    {skill}
                    <Icon icon="mdi:close" className="text-sm opacity-80" />
                  </button>
                ))}
                {filteredExperience
                  .filter((s) => !state.experience.includes(s))
                  .slice(0, 4)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleExperience(skill)}
                      disabled={state.experience.length >= 6}
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
                  value={state.experienceSearch}
                  onChange={(e) => actions.setExperienceSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              {/* Search results */}
              {state.experienceSearch && filteredExperience.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filteredExperience.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => {
                        actions.toggleExperience(exp);
                        actions.setExperienceSearch("");
                      }}
                      disabled={state.experience.length >= 6}
                      className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
                    >
                      {exp}
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
                {state.skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => actions.toggleSkill(skill)}
                    className="flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-700 transition"
                  >
                    {skill}
                    <Icon icon="mdi:close" className="text-sm opacity-80" />
                  </button>
                ))}
                {filteredSkills
                  .filter((s) => !state.skills.includes(s))
                  .slice(0, 4)
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => actions.toggleSkill(skill)}
                      disabled={state.skills.length >= 6}
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
                  value={state.skillSearch}
                  onChange={(e) => actions.setSkillSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                />
              </div>

              {/* Search results */}
              {state.skillSearch && filteredSkills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        actions.toggleSkill(skill);
                        actions.setSkillSearch("");
                      }}
                      disabled={state.skills.length >= 6}
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
                      onClick={() => actions.toggleDay(day)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                        state.availability.includes(day)
                          ? "bg-[#2563EB] text-white shadow-blue-200"
                          : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {state.availability.includes(day) ? (
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
                {/* <div className="border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50">
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
                </div> */}
                {/* <div className="border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50">
                  <Icon icon="mdi:earth" className="text-gray-400 text-base" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Timezone
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      GMT -05:00 (EST)
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-8">
          <button
            onClick={() => {
              actions.save().then(() => {
                if (onSuccess) onSuccess();
              });
            }}
            className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md shadow-blue-200"
          >
            Save
            <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </main>
    </div>
  );
}
