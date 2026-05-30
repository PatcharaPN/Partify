import { axiosInstance } from "@/app/lib/axiosInstance";
import {
  Company,
  CompanyInvite,
  CompanyMember,
  CompanyRole,
} from "@/app/types/job.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CreateCompanyPayload {
  companyName: string;
  companyImageURL?: string;
  companyBio?: string;
  companySize?: string;
}

interface CompanyState {
  company: Company | null;
  members: CompanyMember[];
  pendingInvites: CompanyInvite[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  pendingInvites: [],
  members: [],
  isLoading: false,
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

export const getAllMember = createAsyncThunk(
  "company/member",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/company/members");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create company",
      );
    }
  },
);
export const inviteMember = createAsyncThunk(
  "company/inviteMember",
  async (dto: { email: string; role: CompanyRole }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/company/invite", dto);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to invite member",
      );
    }
  },
);
export const acceptInvite = createAsyncThunk(
  "company/acceptInvite",
  async (inviteId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/company/invite/${inviteId}/accept`,
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept invite",
      );
    }
  },
);

export const declineInvite = createAsyncThunk(
  "company/declineInvite",
  async (inviteId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/company/invite/${inviteId}/decline`,
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decline invite",
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
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get company";
      })

      .addCase(upsertCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(upsertCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(upsertCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create company";
      })
      .addCase(getAllMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload.companyMember;
        state.pendingInvites = action.payload.pendingInvites;
      })
      .addCase(getAllMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(inviteMember.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(inviteMember.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(inviteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(acceptInvite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptInvite.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(declineInvite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(declineInvite.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(declineInvite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCompanyState } = companySlice.actions;
export default companySlice.reducer;
