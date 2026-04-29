import { axiosInstance } from "@/app/lib/axiosInstance";
import { Application, Job } from "@/app/types/job.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ApplicationState = {
  applications: Application[];
  ownerApplications: Application[];
  candidateApplication: Application[];
  jobDetail: Job | null;
  appliedStatus: "PENDING" | "ACCEPTED" | "REJECTED" | null;
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  loading: boolean;
  error: string | null;
};

const initialState: ApplicationState = {
  applications: [],
  jobDetail: null,
  ownerApplications: [],
  candidateApplication: [],
  appliedStatus: null,
  total: 0,
  pending: 0,
  accepted: 0,
  rejected: 0,
  error: null,
  loading: false,
};
export const fetchOwnerApplications = createAsyncThunk(
  "application/fetchOwnerApplications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/applications/owner");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  },
);
export const fetchApplicationsByJob = createAsyncThunk(
  "application/fetchByJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/applications/jobs/${jobId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch applications",
      );
    }
  },
);
export const fetchCandidateApplication = createAsyncThunk(
  "application/candidate",
  async () => {
    const res = await axiosInstance.get("/application/list-application");
    return res.data;
  },
);

export const fetchApplicationStatus = createAsyncThunk(
  "application/status",
  async ({ jobId, userId }: { jobId: string; userId: string }) => {
    const res = await axiosInstance.get(
      `/application/status?jobId=${jobId}&userId=${userId}`,
    );
    return res.data?.status ?? null;
  },
);

export const applyJob = createAsyncThunk(
  "application/apply",
  async ({ jobId, userId }: { jobId: string; userId: string }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/application", {
        jobId,
        userId,
      });
      console.log(res.status);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },

    setStats: (state, action) => {
      const { total, pending, accepted, rejected } = action.payload;
      state.total = total;
      state.pending = pending;
      state.accepted = accepted;
      state.rejected = rejected;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;

        state.applications.push(action.payload);

        state.total += 1;

        if (action.payload.status === "PENDING") {
          state.pending += 1;
        }
      })

      .addCase(applyJob.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchApplicationStatus.fulfilled, (state, action) => {
        state.appliedStatus = action.payload;
      })
      .addCase(fetchCandidateApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.candidateApplication = action.payload;
      })
      .addCase(fetchCandidateApplication.rejected, (state) => {
        state.candidateApplication = [];
        state.loading = false;
      })
      .addCase(fetchCandidateApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwnerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerApplications = action.payload;
      })
      .addCase(fetchOwnerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApplicationsByJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationsByJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetail = action.payload;
      })
      .addCase(fetchApplicationsByJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default applicationSlice.reducer;
