"use client";
import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";
import { useProfile } from "@/app/hooks/useProfile";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const ExperienceSection = () => {
  const { handleUpsert, upsertLoading, profile } = useProfile();
  const [experienceSearch, setExperienceSearch] = useState("");
  const [selectedExpereince, setSelectedExpereince] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearch, setSkillSearch] = useState("");

  const toggleExperience = (skill: string) => {
    if (selectedExpereince.includes(skill)) {
      setSelectedExpereince(selectedExpereince.filter((s) => s !== skill));
    } else if (selectedExpereince.length < 6) {
      setSelectedExpereince([...selectedExpereince, skill]);
    }
  };

  const availableSkills = Array.from(
    new Set(
      selectedExpereince.flatMap((exp) => EXPERIENCE_SKILL_MAP[exp] || []),
    ),
  );

  const EXPERIENCE_OPTIONS = Object.keys(EXPERIENCE_SKILL_MAP).sort();

  const filteredExperience = EXPERIENCE_OPTIONS.filter(
    (s) =>
      !selectedExpereince.includes(s) &&
      s.toLowerCase().includes(experienceSearch.toLowerCase()),
  );

  const filteredSkills = availableSkills.filter(
    (s) =>
      !selectedSkills.includes(s) &&
      s.toLowerCase().includes(skillSearch.toLowerCase()),
  );

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 6) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  useEffect(() => {
    if (profile) {
      setSelectedExpereince(profile.experience || []);
      setSelectedSkills(profile.skills);
    }
  }, [profile]);
  return (
    <div className="bg-gray-50 max-w-2xl min-h-[calc(100vh-70px)] p-6 flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-base mb-0.5">
          Work History
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Select up to 6 jobs that define your core expertise.
        </p>

        <div className="flex flex-2/3 gap-2">
          {" "}
          <div className="relative flex-1">
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"
            />
            <input
              type="text"
              placeholder="Search or add more experience..."
              value={experienceSearch}
              onChange={(e) => setExperienceSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
            />
          </div>
          <button className="bg-primary flex gap-2 items-center px-2 py-2 text-white rounded-lg">
            <span>เพิ่มประวัติการทำงาน </span>
            <Icon icon={"mdi:plus"} />
          </button>
        </div>

        {experienceSearch && filteredExperience.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filteredExperience.map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  toggleExperience(exp);
                  setExperienceSearch("");
                }}
                disabled={selectedExpereince.length >= 6}
                className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
              >
                {exp}
                <Icon icon="mdi:plus" className="text-sm" />
              </button>
            ))}
          </div>
        )}
      </div>{" "}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-base mb-0.5">
          Experiences
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Select up to 6 jobs that define your core expertise.
        </p>

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
          {filteredExperience.slice(0, 4).map((skill) => (
            <button
              key={skill}
              onClick={() => toggleExperience(skill)}
              disabled={selectedExpereince.length >= 6}
              className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {skill}
              <Icon icon="mdi:plus" className="text-sm" />
            </button>
          ))}
        </div>

        <div className="relative">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base"
          />
          <input
            type="text"
            placeholder="Search or add more experience..."
            value={experienceSearch}
            onChange={(e) => setExperienceSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
          />
        </div>

        {experienceSearch && filteredExperience.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filteredExperience.map((exp) => (
              <button
                key={exp}
                onClick={() => {
                  toggleExperience(exp);
                  setExperienceSearch("");
                }}
                disabled={selectedExpereince.length >= 6}
                className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
              >
                {exp}
                <Icon icon="mdi:plus" className="text-sm" />
              </button>
            ))}
          </div>
        )}
      </div>{" "}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 text-base mb-0.5">
          Top Skills
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Select up to 6 skills that define your core expertise.
        </p>

        {selectedExpereince.length === 0 && (
          <p className="text-xs text-gray-400 mb-3 italic">
            เลือก Experience ก่อนเพื่อดู Skills ที่เกี่ยวข้อง
          </p>
        )}

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
          {filteredSkills.slice(0, 4).map((skill) => (
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
      <div className="flex justify-end">
        <button
          onClick={() =>
            handleUpsert({
              experience: selectedExpereince,
              skills: selectedSkills,
            })
          }
          disabled={selectedExpereince.length === 0 || upsertLoading}
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default ExperienceSection;
