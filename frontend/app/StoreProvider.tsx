"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./lib/store";
import { axiosInstance } from "./lib/axiosInstance";
import { setUser } from "./store/slices/authSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axiosInstance
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          storeRef.current?.dispatch(setUser({ user: res.data, token }));
        })
        .catch(() => {
          localStorage.removeItem("access_token");
        });
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
