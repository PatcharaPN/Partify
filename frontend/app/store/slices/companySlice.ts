import { axiosInstance } from "@/app/lib/axiosInstance";
import { Company } from "@/app/types/job.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CreateCompanyPayload {
  companyName: string;
  companyImageURL?: string;
  companyBio?: string;
  companySize?: string;
}

interface CompanyState {
  company: Company | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null,
};

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/company");
      return res.data as Company;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get company",
      );
    }
  },
);

export const upsertCompany = createAsyncThunk(
  "company/create",
  async (formData: CreateCompanyPayload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/company", formData);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create company",
      );
    }
  },
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      state.company = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get company";
      })

      .addCase(upsertCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upsertCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(upsertCompany.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create company";
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;
