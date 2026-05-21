// app/providers.tsx หรือ AuthProvider component
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchCurrentUser } from "../store/slices/authSlice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return <>{children}</>;
}
