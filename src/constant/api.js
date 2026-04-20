export const API_BASE_URL = "http://100.75.152.44:9022";
export const WS_BASE_URL = "ws://100.75.152.44:9022/api";
export const OCR_API_URL = "http://100.107.186.108:5005";

export const API_ENDPOINTS = {
  // Queue & Services
  SERVICES: "/api/services",
  QUEUE_STATE: "/api/queue/state",
  QUEUE_TAKE: "/api/queue/take",
  
  // Authentication
  AUTH_LOGIN: "/api/auth/login",
  AUTH_ME: "/api/auth/me",
  AUTH_LOGOUT: "/api/auth/logout",
  
  // Counter Management
  COUNTER_STATUS: "/api/counter/status",
  COUNTER_LOGIN: "/api/counter/activate",
  COUNTER_LOGOUT: "/api/counter/deactivate",
  COUNTER_NEXT: "/api/counter/next",
  COUNTER_DONE: "/api/counter/done",
  COUNTER_SKIP: "/api/counter/skip",
  COUNTER_RECALL: "/api/counter/recall",
  COUNTER_STATS: "/api/counter/stats",
  
  // ML Service
  ML_STATUS: "/api/ml/status",
  
  // Postal Code
  POSTAL_CODE: "/api/postal-code",
  
  // OCR KTP
  OCR_HYBRID: "/api/hybrid",

  // Admin endpoints
  ADMIN_LOGIN: "/api/admin/login",
  ADMIN_LOGOUT: "/api/admin/logout",
  ADMIN_DASHBOARD_STATS: "/api/backoffice/dashboard",
  ADMIN_QUEUE_STATS: "/api/admin/queue/stats",
  ADMIN_WAITING_QUEUES: "/api/admin/queue/waiting",
};