import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/notification";

export const useNotification = (enabled: boolean) => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    enabled,
  });
};
