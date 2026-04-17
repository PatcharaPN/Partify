import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
