import { useEffect } from "react";
import { fetchOwnerApplications } from "../store/slices/applicationSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { RootState } from "../lib/store";

export const useOwnerApplications = () => {
  const dispatch = useAppDispatch();
  const { ownerApplications, jobDetail, loading } = useAppSelector(
    (state: RootState) => state.ApplicationReducer,
  );
  useEffect(() => {
    dispatch(fetchOwnerApplications());
  }, [dispatch]);

  return {
    ownerApplications,
    loading,
  };
};
