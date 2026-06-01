import { axiosInstance } from "@/app/lib/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Job {
  id: string;
  [key: string]: any;
}

export interface Bookmark {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
}

interface BookmarksState {
  items: Bookmark[];
  loading: boolean;
  error: string | null;
}

const initialState: BookmarksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk<Bookmark[]>(
  "bookmarks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Bookmark[]>("/bookmarks");
      return data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ?? "Failed to fetch bookmarks",
      );
    }
  },
);

export const addBookmark = createAsyncThunk<Bookmark, string>(
  "bookmarks/add",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<Bookmark>(
        `/bookmarks/${jobId}`,
      );
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message ?? "Failed to add bookmark";
      return rejectWithValue(message);
    }
  },
);

export const removeBookmark = createAsyncThunk<string, string>(
  "bookmarks/remove",
  async (jobId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/bookmarks/${jobId}`);
      return jobId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ?? "Failed to remove bookmark",
      );
    }
  },
);

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBookmarks.fulfilled,
        (state, action: PayloadAction<Bookmark[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addBookmark.fulfilled,
        (state, action: PayloadAction<Bookmark>) => {
          state.loading = false;
          state.items.push(action.payload);
        },
      )
      .addCase(addBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeBookmark.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.items = state.items.filter((b) => b.jobId !== action.payload);
        },
      )
      .addCase(removeBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = bookmarksSlice.actions;

export const selectBookmarks = (state: { bookmarks: BookmarksState }) =>
  state.bookmarks.items;
export const selectBookmarksLoading = (state: { bookmarks: BookmarksState }) =>
  state.bookmarks.loading;
export const selectBookmarksError = (state: { bookmarks: BookmarksState }) =>
  state.bookmarks.error;

export const selectIsBookmarked =
  (jobId: string) => (state: { bookmarks: BookmarksState }) =>
    state.bookmarks.items.some((b) => b.jobId === jobId);

export default bookmarksSlice.reducer;
