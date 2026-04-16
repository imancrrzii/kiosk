import { API_ENDPOINTS } from "@/constant/api";
import http from "@/utils/http";

export const AuthService = {
  login: async (username, password) => {
    const response = await http.post(API_ENDPOINTS.AUTH_LOGIN, {
      username,
      password,
    });
    return response.data;
  },

  me: async () => {
    const response = await http.get(API_ENDPOINTS.AUTH_ME);
    return response.data;
  },

  logout: async () => {
    const response = await http.post(API_ENDPOINTS.AUTH_LOGOUT);
    return response.data;
  },

  getToken: () => {
    const stored = localStorage.getItem("queue-auth-storage");
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      return parsed.state?.token || null;
    } catch {
      return null;
    }
  },
};
