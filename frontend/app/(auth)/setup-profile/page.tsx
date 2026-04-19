"use client";

import { useAppSelector } from "@/app/lib/hooks";
import SetupProfileSkeleton from "./skeletonProfileSetup";
import BuildProfilePage from "@/app/components/ui/BuildProfileContainer";

export default function SetupProfilePage() {
  const { isLoading, user } = useAppSelector((state) => state.AuthReducer);

  if (isLoading || !user) {
    return <SetupProfileSkeleton />;
  }
  return <BuildProfilePage mode="setup" />;
}
