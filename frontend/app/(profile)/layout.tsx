"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import ProfileSidebar from "@/app/components/ui/ProfileSidebar";
import TopBar from "../components/layouts/TopBar";
import ProfileStrengthCard from "../components/ui/ProfileStrengthCard";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <div className="flex justify-center h-[calc(100vh-70px)] w-full bg-[#F5F6FA] overflow-hidden">
        <div className="flex min-w-4xl w-full max-w-3xl">
          {/* Sidebar — ไม่ scroll */}
          <div className="w-62.5 shrink-0 bg-white border-r border-gray-200 h-full">
            <ProfileSidebar />
          </div>
          {/* Content — scroll ได้ */}
          <div className="flex-1 flex justify-center h-full overflow-y-auto">
            <div className="w-full max-w-3xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
