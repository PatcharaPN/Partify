import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { clearState, fetchCurrentUser } from "../store/slices/authSlice";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, token, error } = useAppSelector(
    (state) => state.AuthReducer,
  );

  useEffect(() => {
    const localToken = localStorage.getItem("access_token");

    if (!localToken && isAuthenticated) {
      dispatch(clearState());
      return;
    }

    if (localToken && !user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user?.id, isAuthenticated, isLoading]);

  return {
    currentUser: user,
    isAuthenticated,
    isLoading,
    token,
    error,
  };
};
