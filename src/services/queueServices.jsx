import { API_ENDPOINTS } from "@/constant/api";
import http from "@/utils/http";

export const QueueService = {
  getState: async () => {
    const response = await http.get(API_ENDPOINTS.QUEUE_STATE);
    return response.data;
  },

  takeQueue: async (data) => {
    const response = await http.post(API_ENDPOINTS.QUEUE_TAKE, data);
    return response.data;
  },

  getServices: async () => {
    const response = await http.get(API_ENDPOINTS.SERVICES);
    return response.data;
  },
};