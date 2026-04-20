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
  (config) => {
    const token = useAuthStore.getState().getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    if (status === 401 && !url.includes("/login")) {
      const { logout } = useAuthStore.getState();
      logout();
    }

    const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Terjadi kesalahan";

    return Promise.reject(new Error(errorMessage));
  },
);

export default http;
