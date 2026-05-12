"use client";

import { EXPERIENCE_SKILL_MAP } from "@/app/constants/skillOption";
import { Company, Profile } from "@/app/types/job.type";

import { Icon } from "@iconify/react";
import PersonalInfoSection from "./PersonalInfoSection";

import CompanySection from "./CompanySection";
import LocketCompanySection from "./LocketCompanySection";
import ExperienceSection from "./ExperienceSection";
import SkillSection from "./SkillSection";
import AvailabilitySection from "./AvailabilitySection";
import ResumeSection from "./ResumeSection";
import { ProfileFormActions, ProfileFormState } from "@/app/types/ui.type";
import ProfileSidebar from "./ProfileSidebar";
import { useState } from "react";

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
type Section = "info" | "company" | "experience" | "skills" | "resume";
export default function ProfileForm({
  actions,
  state,
  onSuccess,
}: ProfileFormProps) {
  const [activeSection, setActiveSection] = useState<Section>("info");
  const EXPERIENCE_OPTIONS = Object.keys(EXPERIENCE_SKILL_MAP).sort();
  const filteredExperience = EXPERIENCE_OPTIONS.filter(
    (s) =>
      !state.experience.includes(s) &&
      s.toLowerCase().includes(state.experienceSearch.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-[#F5F6FA] font-sans">
      <div className="flex items-center justify-center min-w-2xl">
        <div className="grid grid-cols-[250px_1fr] gap-6">
          <div></div>
          <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col gap-5">
                <PersonalInfoSection
                  name={state.name}
                  phone={state.phone}
                  birthDate={state.birthDate}
                  summary={state.summary}
                  setName={actions.setName}
                  setPhone={actions.setPhone}
                  setBirthDate={actions.setBirthDate}
                  setSummary={actions.setSummary}
                />
                {state.role === "EMPLOYER" ? (
                  <CompanySection
                    company={state.company}
                    setCompanyState={actions.setCompanyState}
                    uploadCompanyImage={actions.uploadCompanyImage}
                  />
                ) : (
                  <LocketCompanySection />
                )}
                <ExperienceSection
                  filteredExperiences={filteredExperience}
                  experiences={state.experience}
                  experienceSearch={state.experienceSearch}
                  toggleExperience={actions.toggleExperience}
                  setExperienceSearch={actions.setExperienceSearch}
                />

                <SkillSection
                  skills={state.skills}
                  experience={state.experience}
                  skillSearch={state.skillSearch}
                  toggleSkill={actions.toggleSkill}
                  setSkillSearch={actions.setSkillSearch}
                />

                <AvailabilitySection
                  availability={state.availability}
                  toggleDay={actions.toggleDay}
                />

                <ResumeSection
                  resumeFile={state.resumeFile}
                  uploadResume={actions.uploadResume}
                  removeResume={actions.removeResume}
                />
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
      </div>
    </div>
  );
}
