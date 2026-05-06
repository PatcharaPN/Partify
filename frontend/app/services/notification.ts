import { axiosInstance } from "../lib/axiosInstance";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");
  return res.data;
};
