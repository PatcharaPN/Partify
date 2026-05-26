import { Company } from "./job.type";

export type PopupState = "loading" | "success" | "error" | null;
export type ProfileFormActions = {
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
  uploadResume: (file: File) => Promise<void>;
  removeResume: () => void;
  uploadCompanyImage: (file: File) => Promise<void>;
  setCompanyState: React.Dispatch<React.SetStateAction<Company>>;
};

export type ProfileFormState = {
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
  resumeFile?: File | null;
  resumeName?: string;
  resumeSize?: string;
  role?: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  company: Company;
};
export type WorkModel = "onsite" | "hybrid" | "remote";
export type JobType = "FULLTIME" | "PARTTIME" | "FREELANCE" | "INTERNSHIP";
export type ExperienceLevel = "ENTRY" | "JUNIOR" | "MID" | "SENIOR";
export type UrgencyLevel = "LOW" | "MEDIUM" | "HIGH";
export const inputCls =
  "w-full px-4 py-2.5 text-sm rounded-xl border border-neutral-200 bg-neutral-50 text-gray-800 placeholder:text-neutral-300 focus:outline-none focus:border-blue-400 focus:bg-white transition-all";

export const labelCls =
  "text-[11px] font-medium tracking-widest text-neutral-400 uppercase";
