import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  fetchApplicationsByJob,
  fetchOwnerApplications,
} from "../store/slices/applicationSlice";
import { RootState } from "../lib/store";
import { axiosInstance } from "../lib/axiosInstance";

export const useApplicant = (jobId?: string) => {
  const dispatch = useAppDispatch();
  const {
    jobDetail,
    loading,
    ownerApplications,
    accepted,
    applications,
    appliedStatus,
    candidateApplication,
    error,
    pending,
    rejected,
    total,
  } = useAppSelector((state: RootState) => state.ApplicationReducer);
  useEffect(() => {
    if (jobId) {
      dispatch(fetchApplicationsByJob(jobId));
    }
  }, [jobId, dispatch]);
  useEffect(() => {
    dispatch(fetchOwnerApplications());
  }, [dispatch]);
  const rejectApplication = async (id: string) => {
    try {
      await axiosInstance.post(`/applications/${id}/reject`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      console.error("Approve failed:", error);
      throw error;
    }
  };
  const approveApplication = async (id: string) => {
    try {
      await axiosInstance.post(`/applications/${id}/approve`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      console.error("Approve failed:", error);
      throw error;
    }
  };

  const interviewApplication = async (id: string) => {
    try {
      await axiosInstance.post(`/applications/${id}/interview`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      console.error("Interview failed:", error);
      throw error;
    }
  };
  const totalApplicants =
    jobDetail?.applications.filter((a) => a.status === "PENDING").length ?? 0;
  return {
    jobDetail,
    loading,
    approveApplication,
    rejectApplication,
    interviewApplication,
    totalApplicants,
    ownerApplications,
    accepted,
    applications,
    appliedStatus,
    candidateApplication,
    error,
    pending,
    rejected,
    total,
  };
};
