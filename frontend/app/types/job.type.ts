export interface Company {
  id: string;
  companyName: string;
  userId: string;
  category?: string;
  companyImageURL?: string;
  companyBio?: string;
  companySize?: string;
  createdAt: string;
  updatedAt: string;
  companyProfileURL?: string;
}

export type WorkModel = "onsite" | "hybrid" | "remote";
export type ApplicationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "INTERVIEW";
export type Role = "CANDIDATE" | "EMPLOYER" | "ADMIN" | null;
export type JobType = "FREELANCE" | "PARTTIME" | "FULLTIME" | "CONTRACT";

export interface Job {
  id: string;
  isOwner: boolean;
  title: string;
  status?: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;
  category?: string;

  salaryMin?: number;
  salaryMax?: number;
  salaryNegotiable: boolean;
  currency?: string;

  jobType?: JobType;
  workStyle?: string;
  experienceLevel?: string;
  experienceYears?: number;
  educationLevel?: string;
  positions?: number;

  workingHours?: string;
  workingDays?: string;
  startDate?: string;
  closingDate?: string;

  overviewPictureURL?: string[];
  benefits: string[];
  skills: string[];

  location?: string;
  urgency?: string;
  province?: string;
  district?: string;
  locationDetail?: string;

  isBookmarked?: boolean;
  isApplied: boolean;

  company: Company;
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  job?: Job;
  user?: User;
}

export interface User {
  id: string;
  email: string | null;
  role: Role;
  company?: Company;
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

export type ImageSlot = {
  file?: File;
  preview: string;
};

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

  salaryMin?: number;
  salaryMax?: number;
  salaryNegotiable: boolean;
  currency?: string;

  overviewPictureURL: ImageSlot[];
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
  firstName: string;
  lastName?: string;
  phone?: string;
  summary?: string;
  workingHours?: string;
  province?: string;
  district?: string;
  skills: string[];
  shifts: string[];
  availability: string[];
  preferredJobTypes: string[];
  preferredCategories: string[];
  expectedSalary?: number;
  experience: string[];
  gender?: string;
  nationality?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  birthDate?: string;
  reliabilityScore?: number;
  updatedAt: string;
};

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
}
