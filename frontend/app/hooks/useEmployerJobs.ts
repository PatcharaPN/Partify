import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";
import { fetchCurrentUser } from "../store/slices/authSlice";
import { fetchOwnerRelatedJobs } from "../store/slices/jobSlice";

export const useEmployerJobs = () => {
  const dispatch = useAppDispatch();
  const { employeeJob, isLoading } = useAppSelector(
    (state: RootState) => state.jobReducer,
  );

  const { user } = useAppSelector((state: RootState) => state.AuthReducer);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOwnerRelatedJobs(user.id));
    }
  }, [user?.id, dispatch]);

  const jobs = Array.isArray(employeeJob) ? employeeJob : [];

  const applicant = jobs.flatMap((applicants) => applicants.applications);
  const totalApplicants =
    applicant.filter((a) => a.status === "PENDING").length ?? 0;

  return {
    jobs,
    user,
    isLoading,
    totalApplicants,
  };
};
