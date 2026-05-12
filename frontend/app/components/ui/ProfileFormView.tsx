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
  console.log("company", state.company);
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
  const filteredExperience = EXPERIENCE_OPTIONS.filter(
    (s) =>
      !state.experience.includes(s) &&
      s.toLowerCase().includes(state.experienceSearch.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-[#F5F6FA] font-sans">
      <div className="grid grid-cols-[200px_1fr] gap-6"></div>
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
                    actions.setAvatarPreview(previewUrl);
                    await actions.uploadAvatar(file);
                  }}
                />

                <span className="block text-center text-sm font-medium text-gray-600 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 transition">
                  Upload Photo
                </span>
              </label>
            </div>
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
  );
}
