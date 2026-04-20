"use client";
import { useAppSelector } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const navigate = useRouter();
  const { user, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.AuthReducer,
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      navigate.replace("/login");
      return;
    }
    if (user?.role === "CANDIDATE") {
      navigate.replace("/dashboard/candidate");
    }
    if (user?.role === "EMPLOYER") {
      navigate.replace("/dashboard/employer");
    }
  }, [user, isAuthenticated, isLoading, navigate]);
  return <div className="">Redirecting...</div>;
}
