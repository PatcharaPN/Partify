import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "./profileSlice";

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
  isLoading?: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

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
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
