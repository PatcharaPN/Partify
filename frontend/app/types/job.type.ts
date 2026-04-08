export interface Skill {
  id: string;
  name: string;
  jobId: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities?: string;
  qualifications?: string;

  // Salary
  salaryMin?: number;
  salaryMax?: number;
  salaryNegotiable: boolean;
  currency?: string;

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

  // Relations
  skills: Skill[];

  createdAt: string;
}

// Redux Slice
export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
}
