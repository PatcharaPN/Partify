import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "./profileSlice";
import { axiosInstance } from "@/app/lib/axiosInstance";

export interface User {
  id: string;
  email: string | null;
  lineId: string | null;
  role: "CANDIDATE" | "EMPLOYER" | "ADMIN";
  profile: Profile | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};
type RegisterPayload = {
  email: string;
  password: string;
  role?: string;
};
type AuthResponse = {
  access_token: string;
  user: User;
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, role }: RegisterPayload) => {
    const res = await axiosInstance.post<AuthResponse>("/auth/register", {
      email,
      password,
      role: role || "CANDIDATE",
    });
    const token = res.data.access_token;
    localStorage.setItem("access_token", token);
    return res.data;
  },
);

export const fetchCurrentUser = createAsyncThunk("/auth/me", async () => {
  const res = await axiosInstance.get("/me");
  return res.data;
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: RegisterPayload) => {
    const res = await axiosInstance.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    const token = res.data.access_token;
    localStorage.setItem("access_token", token);
    return res.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Register failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Login failed";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message ?? "Fetch user failed";
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
