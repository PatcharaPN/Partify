import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProfile, upsertProfile } from "../store/slices/profileSlice";
import { Profile } from "../types/job.type";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { profile, upsertLoading, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );

  const handleUpsert = (data: Partial<Profile>) => {
    dispatch(upsertProfile(data));
  };

  const handleFetch = () => {
    dispatch(fetchProfile());
  };

  return {
    profile,
    upsertLoading,
    fetchLoading,
    handleUpsert,
    handleFetch,
  };
};
