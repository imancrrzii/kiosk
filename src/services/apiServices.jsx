import authStore from "@/stores/authStore";
import { AuthService } from "./authServices";
import { SignatureService } from "./signatureServices";
import mappingMsgService from "./mappingMsgServices";
import http from "@/utils/http";
import { API_BASE_URL } from "@/constant/api";

export async function doLogin(credentials) {
  const store = authStore.getState();
  store.clearError();

  try {
    const signedHeaders = SignatureService.generateLoginHeaders("POST", "/api/sifina-middleware/bo/v1/login", credentials);
    const response = await http.post("/v1/login", credentials, {
      headers: signedHeaders,
    });

    const { data } = response;
    if (data.responseCode === "0000") {
      const { email, refreshToken, token, role, id } = data.data;

      if (!token) {
        throw new Error("Access token missing from response");
      }

      AuthService.setToken(token);
      if (refreshToken) {
        AuthService.setRefreshToken(refreshToken);
      }

      const userData = { email, role, id };
      store.setUser(userData);

      return { success: true, data };
    } else {
      const errorMessage = mappingMsgService(data.responseCode, data.responseMessage) || "Login failed";
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    const errorMessage =
      mappingMsgService(error.response?.data?.responseCode, error.response?.data?.responseMessage, error.code) ||
      "Network error occurred";
    store.setError(errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function doLogout() {
  const store = authStore.getState();
  try {
    const signedHeaders = SignatureService.generateLogoutHeaders("POST", "/api/sifina-middleware/bo/v1/logout", {});

    const response = await http.post("/v1/logout", {}, { headers: signedHeaders });

    const { data } = response;

    if (data.responseCode === "0000") {
      AuthService.clearAllTokens();
      store.clearUser();
      return true;
    } else {
      const errorMessage = mappingMsgService(data.responseCode, data.responseMessage) || "Logout failed";
      store.setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    const errorMessage =
      mappingMsgService(error.response?.data?.responseCode, error.response?.data?.responseMessage, error.code) ||
      "Network error occurred";
    store.setError(errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function doRefreshToken() {
  const store = authStore.getState();
  const refreshToken = AuthService.getRefreshToken();

  if (!refreshToken) {
    AuthService.clearAllTokens();
    store.clearUser();
    return null;
  }

  try {
    const response = await http.get("/v1/refresh");
    const { data } = response;

    if (data.responseCode === "0000") {
      const { token, refreshToken: newRefreshToken } = data.data;

      if (!token) {
        throw new Error("No access token in refresh response");
      }

      AuthService.setToken(token);
      if (newRefreshToken) {
        AuthService.setRefreshToken(newRefreshToken);
      }
      return token;
    } else {
      AuthService.clearAllTokens();
      store.clearUser();
      return null;
    }
  } catch (error) {
    AuthService.clearAllTokens();
    store.clearUser();
    console.error("Error refreshing token:", error);
    return null;
  }
}

export const api = async (path, opts = {}) => {
  const token = localStorage.getItem("queue_token");
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...opts,
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.detail || "Request gagal");
  }
  return res.json();
};