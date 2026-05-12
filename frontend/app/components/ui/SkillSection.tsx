import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";
import { Icon } from "@iconify/react";

type SkillSectionProps = {
  experience: string[];
  skills: string[];
  skillSearch: string;

  toggleSkill: (skill: string) => void;
  setSkillSearch: (value: string) => void;
};

const SkillSection = ({
  experience,
  skillSearch,
  skills,
  toggleSkill,
  setSkillSearch,
}: SkillSectionProps) => {
  const availableSkills = Array.from(
    new Set(experience.flatMap((exp) => EXPERIENCE_SKILL_MAP[exp] || [])),
  );
  const filteredSkills = availableSkills.filter(
    (s) =>
      !skills.includes(s) &&
      s.toLowerCase().includes(skillSearch.toLowerCase()),
  );
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h2 className="font-semibold text-gray-900 text-base mb-0.5">
        Top Skills
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Select up to 6 skills that define your core expertise.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => (
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
          .filter((s) => !skills.includes(s))
          .slice(0, 4)
          .map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              disabled={skills.length >= 6}
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
              disabled={skills.length >= 6}
              className="flex items-center gap-1 bg-white border border-blue-200 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-blue-50 transition disabled:opacity-40"
            >
              {skill}
              <Icon icon="mdi:plus" className="text-sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillSection;
