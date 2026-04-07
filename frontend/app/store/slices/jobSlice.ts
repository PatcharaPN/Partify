// store/slices/jobSlice.ts
import { axiosInstance } from "@/app/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  id: string;
  title: string;
  description: string;
  salary?: number;
  location?: string;
  createdAt: string;
  workingHours?: string;
  workingDays?: string;
  startDate?: string;
  companyId: string;
  companyImageURL?: string;
  companyName?: string;
}

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  isLoading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchAll", async () => {
  const token = localStorage.getItem("access_token");
  const res = await axiosInstance.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "เกิดข้อผิดพลาด";
      });
  },
});

export default jobSlice.reducer;
