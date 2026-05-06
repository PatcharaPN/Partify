"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser } from "@/app/store/slices/authSlice";
import { axiosInstance } from "@/app/lib/axiosInstance";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = params.get("token");
    const isNew = params.get("isNew") === "true";

    if (token) {
      localStorage.setItem("access_token", token);

      axiosInstance
        .get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setUser({ user: res.data, token }));

          if (isNew) {
            router.push("/setup-profile");
          } else {
            router.push("/");
          }
        });
    }
  }, []);

  return <p>กำลังเข้าสู่ระบบ...</p>;
}
