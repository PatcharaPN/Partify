import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { Profile } from "@/app/types/job.type";

type ProfileState = {
  profile: Profile | null;
  fetchLoading: boolean;
  upsertLoading: boolean;
};
const initialState: ProfileState = {
  profile: null,
  fetchLoading: false,
  upsertLoading: false,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/me");
      console.log(res.data.profile);

      return res.data.profile;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const upsertProfile = createAsyncThunk(
  "profile/upsert",
  async (data: Partial<Profile>, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch("users/me/profile", data);
      console.log("Sent");

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
        state.fetchLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.fetchLoading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(upsertProfile.pending, (state) => {
        state.upsertLoading = true;
      })
      .addCase(upsertProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.upsertLoading = false;
      })
      .addCase(upsertProfile.rejected, (state) => {
        state.upsertLoading = false;
      });
  },
});

export default profileSlice.reducer;
