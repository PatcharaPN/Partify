import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  fetchApplicationsByJob,
  fetchOwnerApplications,
  updateApplicationOptimistic,
  revertApplicationOptimistic,
} from "../store/slices/applicationSlice";
import { RootState } from "../lib/store";
import { axiosInstance } from "../lib/axiosInstance";
import { ApplicationStatus } from "../types/job.type";

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
    if (jobId) dispatch(fetchApplicationsByJob(jobId));
  }, [jobId, dispatch]);

  useEffect(() => {
    dispatch(fetchOwnerApplications());
  }, [dispatch]);

  const rejectApplication = async (id: string) => {
    const prevStatus = jobDetail?.applications.find((a) => a.id === id)?.status;

    dispatch(
      updateApplicationOptimistic({ id, status: ApplicationStatus.REJECTED }),
    );

    try {
      await axiosInstance.post(`/applications/${id}/reject`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      if (prevStatus) dispatch(revertApplicationOptimistic({ id, prevStatus }));
      console.error("Reject failed:", error);
      throw error;
    }
  };

  const approveApplication = async (id: string) => {
    const prevStatus = jobDetail?.applications.find((a) => a.id === id)?.status;

    dispatch(
      updateApplicationOptimistic({ id, status: ApplicationStatus.ACCEPTED }),
    );

    try {
      await axiosInstance.post(`/applications/${id}/approve`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      if (prevStatus) dispatch(revertApplicationOptimistic({ id, prevStatus }));
      console.error("Approve failed:", error);
      throw error;
    }
  };

  const offerApplication = async (id: string) => {
    const prevStatus = jobDetail?.applications.find((a) => a.id === id)?.status;

    dispatch(
      updateApplicationOptimistic({ id, status: ApplicationStatus.OFFER }),
    );

    try {
      await axiosInstance.post(`/applications/${id}/offer`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      if (prevStatus) dispatch(revertApplicationOptimistic({ id, prevStatus }));
      console.error("Offer failed:", error);
      throw error;
    }
  };

  const interviewApplication = async (id: string) => {
    const prevStatus = jobDetail?.applications.find((a) => a.id === id)?.status;

    dispatch(
      updateApplicationOptimistic({ id, status: ApplicationStatus.INTERVIEW }),
    );

    try {
      await axiosInstance.post(`/applications/${id}/interview`);
      await dispatch(fetchApplicationsByJob(jobId!));
    } catch (error) {
      if (prevStatus) dispatch(revertApplicationOptimistic({ id, prevStatus }));
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
    offerApplication,
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
