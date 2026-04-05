"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUser, User } from "@/app/store/slices/authSlice";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      const decoded = jwtDecode<User>(token);
      localStorage.setItem("access_token", token);
      dispatch(setUser({ user: decoded, token }));
      router.push("/");
    }
  }, []);

  return <p>กำลังเข้าสู่ระบบ...</p>;
}
