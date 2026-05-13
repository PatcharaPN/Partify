export interface Skill {
  id: string;
  name: string;
  jobId: string;
}
export interface Company {
  id?: string;
  companyName: string;
  userId?: string;
  companyImageURL?: string;
  companyBio?: string;
  companySize?: string;
  createdAt?: string;
  location?: string;
  updatedAt?: string;
  companyProfileURL?: string;
}
export interface Job {
  id: string;
  isOwner: boolean;
  title: string;
  status: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;

  salaryMin?: number;
  salaryMax?: number;
  salaryNegotiable: boolean;
  currency?: string;
  isBookmarked?: boolean;
  jobType?: string;
  workStyle?: string;
  experienceLevel?: string;
  experienceYears?: number;
  educationLevel?: string;
  positions: number;
  category?: string;
  workingHours?: string;
  workingDays?: string;
  startDate?: string;
  closingDate?: string;

  benefits: string[];

  location?: string;
  urgency?: string;

  company: Company;
  overviewPictureURL?: string[];
  skills: Skill[];
  applications: Application[];
  isApplied: boolean;
  createdAt: string;

  province?: string;
  district?: string;
  locationDetail?: string;
}
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  createdAt: Date;
  status: ApplicationStatus;
  job?: Job;
  user?: User;
}
// Redux Slice
export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
}
export interface User {
  id: string;
  email: string | null;
  lineId: string | null;
  role: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  companyId: string;
  company: Company;
  profile: Profile | null;
  resume: Resume[];
}
export type Resume = {
  id: string;
  userId: string;
  fileName?: string | null;
  url: string;
  createdAt: string;
};
export type WorkModel = "onsite" | "hybrid" | "remote";

export type PostJobFormData = {
  title: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;

  category?: string;
  jobType: string;
  workStyle: WorkModel;
  experienceLevel?: string;
  experienceYears?: number;
  educationLevel?: string;
  positions?: number;
  urgency?: string;
  status?: string;

  salaryMin?: string;
  salaryMax?: string;
  salaryNegotiable: boolean;
  currency?: string;

  workingHours: string;
  workingDays: string;
  startDate: string;
  closingDate: string;
  province: string;
  district: string;
  locationDetail: string;
  location: string;
  benefits: string[];
};
export type Profile = {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  summary?: string;
  experience?: string[];
  skills: string[];
  shifts: string[];
  availability: string[];
  resumeUrl?: string;
  avatarUrl?: string;
  birthDate?: string;
};

export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "INTERVIEW";
export type ImageSlot = {
  file: File;
  preview: string;
};
