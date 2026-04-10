// store/slices/jobSlice.ts
import { axiosInstance } from "@/app/lib/axiosInstance";
import { Job } from "@/app/types/job.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobState {
  jobs: Job[];
  isLoading: boolean;
  selectedJob: Job | null;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
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

export const fetchJobById = createAsyncThunk("", async (jobId: string) => {
  const token = localStorage.getItem("access_token");
  const res = await axiosInstance.get(`/jobs/${jobId}`, {
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
      })
      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.selectedJob = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "เกิดข้อผิดพลาด";
      });
  },
});

export default jobSlice.reducer;
