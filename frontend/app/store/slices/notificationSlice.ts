import { axiosInstance } from "@/app/lib/axiosInstance";
import { Notification } from "@/app/types/job.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type NotificationState = {
  notification: Notification[];
  isLoading: boolean;
  error: string | null;
};

const initialState: NotificationState = {
  notification: [],
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/notifications");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch",
      );
    }
  },
);

export const readOneNotification = createAsyncThunk(
  "notification/readOne",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/notifications/${notificationId}/read`);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message ?? "Failed to read");
    }
  },
);

export const readAllNotifications = createAsyncThunk(
  "notification/readAll",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.patch("/notifications/read-all");
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to read all",
      );
    }
  },
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notification = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //Optimistic Update
      .addCase(readOneNotification.fulfilled, (state, action) => {
        const target = state.notification.find((n) => n.id === action.payload);
        if (target) target.isRead = true;
      })

      .addCase(readAllNotifications.fulfilled, (state) => {
        state.notification.forEach((n) => (n.isRead = true));
      });
  },
});

export default notificationSlice.reducer;
