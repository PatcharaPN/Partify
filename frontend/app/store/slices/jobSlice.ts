// store/slices/jobSlice.ts
import { axiosInstance } from "@/app/lib/axiosInstance";
import { Job, PostJobFormData } from "@/app/types/job.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobState {
  jobs: Job[];
  recomandJobs: Job[];
  employeeJob: Job[];
  relatedJobs: Job[];
  searchResults: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  selectedJob: Job | null;
  error: string | null;
}
type UpsertJobPayload = Omit<
  PostJobFormData,
  "salaryMin" | "salaryMax" | "overviewPictureURL"
> & {
  salaryMin: number;
  salaryMax: number;
  overviewPictureURL: string[];
};

const initialState: JobState = {
  jobs: [],
  employeeJob: [],
  recomandJobs: [],
  relatedJobs: [],
  searchResults: [],
  total: 0,
  totalPages: 0,
  currentPage: 1,
  selectedJob: null,
  isLoading: false,
  error: null,
};

export const postJob = createAsyncThunk(
  "jobs/postJob",
  async (formData: any, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/jobs/add", formData);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to post job",
      );
    }
  },
);

export const fetchRelatedJob = createAsyncThunk(
  "/jobs/related",
  async (jobId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/jobs/related/${jobId}`);
      return res.data as Job[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to post job",
      );
    }
  },
);
export const upsertJob = createAsyncThunk(
  "job/upsert",
  async (payload: { id?: string } & Partial<UpsertJobPayload>) => {
    const { id, ...data } = payload;

    const res = id
      ? await axiosInstance.patch(`/jobs/${id}`, data)
      : await axiosInstance.post("/jobs", data);

    return res.data;
  },
);
export const fetchRecomandJob = createAsyncThunk(
  "jobs/fetchRecomandJob",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/jobs/recommend");

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch recommended jobs",
      );
    }
  },
);

export const fetchJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/jobs");

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs",
      );
    }
  },
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchById",
  async (jobId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/jobs/${jobId}`);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch job",
      );
    }
  },
);

export const fetchOwnerRelatedJobs = createAsyncThunk(
  "jobs/fetchOwner",
  async (ownerId: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/jobs/owner/${ownerId}`);

      return res.data as Job[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch owner jobs",
      );
    }
  },
);

export const searchJob = createAsyncThunk(
  "jobs/search",
  async (
    {
      search,
      skills,
      page,
      jobType,
    }: {
      search?: string;
      skills?: string[];
      page?: number;
      jobType?: string[];
    } = {},
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (skills?.length) params.set("skills", skills.join(","));
      if (page) params.set("page", String(page));
      if (jobType) params.set("jobType", jobType.join(","));

      const res = await axiosInstance(`/jobs/search?${params}`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search jobs",
      );
    }
  },
);

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
        state.error = (action.payload as string) ?? "Failed to fetch jobs";
      })

      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchJobById.fulfilled, (state, action: PayloadAction<Job>) => {
        state.selectedJob = action.payload;
        state.isLoading = false;

        const exists = state.jobs.find((j) => j.id === action.payload.id);
        if (!exists) {
          state.jobs.push(action.payload);
        }
      })

      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to fetch job";
      })

      .addCase(fetchOwnerRelatedJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchOwnerRelatedJobs.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.isLoading = false;
          state.employeeJob = action.payload;
        },
      )

      .addCase(fetchOwnerRelatedJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ?? "Failed to fetch owner jobs";
      })

      .addCase(fetchRecomandJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        fetchRecomandJob.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.isLoading = false;
          state.recomandJobs = action.payload;
        },
      )

      .addCase(fetchRecomandJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ?? "Failed to fetch recommended jobs";
      })

      .addCase(upsertJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upsertJob.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.jobs.findIndex((j) => j.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        } else {
          state.jobs.push(action.payload);
        }
      })
      .addCase(upsertJob.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRelatedJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relatedJobs = action.payload;
      })
      .addCase(searchJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(searchJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
      })

      .addCase(searchJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Failed to search jobs";
      });
  },
});

export default jobSlice.reducer;
