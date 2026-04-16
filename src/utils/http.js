import axios from "axios";
import useAuthStore from "@/stores/authStore";
import { API_BASE_URL } from "@/constant/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, 
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Terjadi kesalahan";

    return Promise.reject(new Error(errorMessage));
  }
);

export default http;