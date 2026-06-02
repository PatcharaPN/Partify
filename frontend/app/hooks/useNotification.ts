import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/notification";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { useEffect } from "react";
import {
  fetchNotifications,
  readAllNotifications,
  readOneNotification,
} from "../store/slices/notificationSlice";

export const useNotification = (enabled: boolean) => {
  const dispatch = useAppDispatch();
  const { notification, isLoading, error } = useAppSelector(
    (state) => state.NotificationReducer,
  );
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (enabled) {
      dispatch(fetchNotifications());
    }
  }, [enabled, dispatch]);

  const handleReadAll = async () => {
    const result = await dispatch(readAllNotifications());
    if (readAllNotifications.rejected.match(result)) {
      console.error(result.payload);
    }
  };

  const handleReadOne = async (notificationId: string) => {
    const result = await dispatch(readOneNotification(notificationId));
    if (readOneNotification.rejected.match(result)) {
      console.error(result.payload);
    }
  };
  return { notification, isLoading, error, handleReadAll, handleReadOne };
  // return useQuery({
  //   queryKey: ["notifications"],
  //   queryFn: getNotifications,
  //   enabled,
  // });
};
