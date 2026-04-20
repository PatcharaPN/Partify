"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import SetupProfileSkeleton from "./skeletonProfileSetup";
import BuildProfilePage from "@/app/components/ui/BuildProfileContainer";
import { useEffect } from "react";
import { fetchCurrentUser } from "@/app/store/slices/authSlice";

export default function SetupProfilePage() {
  const { isLoading, user } = useAppSelector((state) => state.AuthReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  if (isLoading) {
    return <SetupProfileSkeleton />;
  }

  return <BuildProfilePage mode="setup" />;
}
