export interface Skill {
  id: string;
  name: string;
  jobId: string;
}

export interface Job {
  id: string;
  isOwner: boolean;
  title: string;
  status: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;

  // Salary
  salaryMin?: number;
  salaryMax?: number;
  salaryNegotiable: boolean;
  currency?: string;
  isBookmarked?: boolean;
  // Job Info
  jobType?: string;
  workStyle?: string;
  experienceLevel?: string;
  experienceYears?: number;
  educationLevel?: string;
  positions: number;

  // Schedule
  workingHours?: string;
  workingDays?: string;
  startDate?: string;
  closingDate?: string;

  // Benefits
  benefits: string[];

  // Location
  location?: string;
  urgency?: string;

  // Company
  companyId: string;
  companyName?: string;
  companyImageURL?: string;
  overviewPictureURL?: string[];
  companyProfileURL: string;
  // Relations
  skills: Skill[];
  applications: Application[];

  createdAt: string;
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
