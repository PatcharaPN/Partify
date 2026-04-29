import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchApplicationsByJob } from "../store/slices/applicationSlice";
import { RootState } from "../lib/store";

export const useJobApplications = (jobId: string) => {
  const dispatch = useAppDispatch();
  const { jobDetail, loading } = useAppSelector(
    (state: RootState) => state.ApplicationReducer,
  );
  useEffect(() => {
    if (jobId) {
      dispatch(fetchApplicationsByJob(jobId));
    }
  }, [jobId, dispatch]);

  return {
    jobDetail,
    loading,
  };
};
