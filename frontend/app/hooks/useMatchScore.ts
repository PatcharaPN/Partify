import { useMemo } from "react";
import { Job, Profile } from "../types/job.type";
import { useCurrentUser } from "./useCurrentUser";

export const useMatchScore = (job: Job) => {
  const { currentUser } = useCurrentUser();

  return useMemo(() => {
    if (!currentUser?.profile) return 0;

    let score = 0;

    const matchedSkills = job.skills.filter((skill) =>
      currentUser?.profile?.skills.includes(skill),
    ).length;

    score += (matchedSkills / Math.max(job.skills.length, 1)) * 80;

    if (job.workingDays?.trim() === currentUser?.profile?.workingDays?.trim()) {
      score += 20;
    }

    return Math.round(score);
  }, [job, currentUser?.profile]);
};
