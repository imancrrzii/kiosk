import { API_ENDPOINTS } from "@/constant/api";
import http from "@/utils/http";

export const AdminService = {
  login: async (username, password) => {
    const response = await http.post(API_ENDPOINTS.ADMIN_LOGIN, {
      username,
      password,
    });
    return response.data;
  },
  
  getWaitingQueues: async () => {
    const response = await http.get(API_ENDPOINTS.ADMIN_WAITING_QUEUES);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await http.post(API_ENDPOINTS.ADMIN_DASHBOARD_STATS);
    return response.data;
  },

};