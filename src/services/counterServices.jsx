import { API_ENDPOINTS } from "@/constant/api";
import http from "@/utils/http";

export const CounterService = {
  getStatus: async () => {
    const response = await http.get(API_ENDPOINTS.COUNTER_STATUS);
    return response.data;
  },

  login: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_LOGIN);
    return response.data;
  },

  logout: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_LOGOUT);
    return response.data;
  },

  callNext: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_NEXT);
    return response.data;
  },

  markDone: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_DONE);
    return response.data;
  },

  skip: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_SKIP);
    return response.data;
  },

  recall: async () => {
    const response = await http.post(API_ENDPOINTS.COUNTER_RECALL);
    return response.data;
  },

  getStats: async () => {
    const response = await http.get(API_ENDPOINTS.COUNTER_STATS);
    return response.data;
  },
};
