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

  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applications?.length ?? 0),
    0,
  );
  return {
    jobs,
    user,
    isLoading,
    totalApplicants,
  };
};
