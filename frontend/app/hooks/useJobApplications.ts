import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchApplicationsByJob } from "../store/slices/applicationSlice";
import { RootState } from "../lib/store";
import { axiosInstance } from "../lib/axiosInstance";

export const useJobApplications = (jobId?: string) => {
  const dispatch = useAppDispatch();
  const { jobDetail, loading } = useAppSelector(
    (state: RootState) => state.ApplicationReducer,
  );
  useEffect(() => {
    if (jobId) {
      dispatch(fetchApplicationsByJob(jobId));
    }
  }, [jobId, dispatch]);
  const approveApplication = async (id: string) => {
    try {
      await axiosInstance.post(`/applications/${id}/approve`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      console.error("Approve failed:", error);
      throw error;
    }
  };
  const totalApplicants =
    jobDetail?.applications.filter((a) => a.status === "PENDING").length ?? 0;
  return {
    jobDetail,
    loading,
    approveApplication,
    totalApplicants,
  };
};
