import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchCurrentUser } from "../store/slices/authSlice";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  const currentUser = user;
  return { currentUser };
};
