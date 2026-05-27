import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchOwnerApplications } from "../store/slices/applicationSlice";

export const useApplicant = () => {
  const dispatch = useAppDispatch();
  const {
    ownerApplications,
    accepted,
    applications,
    appliedStatus,
    candidateApplication,
    error,
    jobDetail,
    loading,
    pending,
    rejected,
    total,
  } = useAppSelector((state) => state.ApplicationReducer);

  useEffect(() => {
    dispatch(fetchOwnerApplications());
  }, [dispatch]);

  return {
    ownerApplications,
    accepted,
    applications,
    appliedStatus,
    candidateApplication,
    error,
    jobDetail,
    loading,
    pending,
    rejected,
    total,
  };
};
