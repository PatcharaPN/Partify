import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/lib/axiosInstance";

export type Profile = {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  summary?: string;
  skills: string[];
  shifts: string[];
  availability: string[];
  resumeUrl?: string;
  avatarUrl?: string;
  birthDate?: string;
};

type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;
};

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
};

//
// GET PROFILE
//
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/me");
      return res.data.profile;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

//
// UPSERT PROFILE
//
export const upsertProfile = createAsyncThunk(
  "profile/upsert",
  async (data: Partial<Profile>, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("users/me/profile", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // fetch
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(upsertProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upsertProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(upsertProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default profileSlice.reducer;
