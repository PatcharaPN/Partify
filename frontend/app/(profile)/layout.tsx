"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/lib/hooks";
import { fetchProfile } from "@/app/store/slices/profileSlice";
import ProfileSidebar from "@/app/components/ui/ProfileSidebar";
import TopBar from "../components/layouts/TopBar";

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
      {" "}
      <TopBar />
      <div className="flex justify-center w-full min-h-screen bg-[#F5F6FA]">
        <div className="flex min-w-4xl">
          <div className="w-62.5 shrink-0 bg-white  border-gray-200">
            <ProfileSidebar />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-3xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
