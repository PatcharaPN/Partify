import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchCurrentUser } from "../store/slices/authSlice";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, token, error } = useAppSelector(
    (state) => state.AuthReducer,
  );

  useEffect(() => {
    dispatch(fetchCurrentUser()).unwrap();
  }, [dispatch]);
  const currentUser = user;
  return { currentUser, isAuthenticated, isLoading, token, error };
};
