"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.AuthReducer,
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !user) return;

    if (isLoading) return;

    if (!user || !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user.role === "CANDIDATE") {
      router.replace("/dashboard/candidate");
    } else if (user.role === "EMPLOYER") {
      router.replace("/dashboard/employer/overviews");
    }
  }, [user, isAuthenticated, isLoading, router]);

  return null;
}
