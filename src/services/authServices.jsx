import { jwtDecode } from "jwt-decode";
import { decryptData, encryptData } from "../utils/helpers";

export const AuthService = {
  STORAGE_KEYS: {
    ACCESS_TOKEN: "access-token",
    REFRESH_TOKEN: "refresh-token",
  },

  getToken() {
    try {
      const encryptedToken = localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN);
      if (!encryptedToken) {
        return null;
      }
      return decryptData(encryptedToken);
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  setToken(token) {
    try {
      if (!token) {
        return;
      }
      const encryptedToken = encryptData(token);
      localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, encryptedToken);
    } catch (error) {
      console.error(error);
    }
  },

  getRefreshToken() {
    try {
      const encryptedToken = localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN);
      if (!encryptedToken) {
        return null;
      }
      return decryptData(encryptedToken);
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  setRefreshToken(refreshToken) {
    try {
      if (!refreshToken) {
        return;
      }
      const encryptedToken = encryptData(refreshToken);
      localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, encryptedToken);
    } catch (error) {
      console.error(error);
    }
  },

  isAuthenticated() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      try {
        const decodedToken = jwtDecode(token);
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const isExpired = decodedToken.exp <= nowInSeconds;

        if (isExpired) {
          const refreshToken = this.getRefreshToken();
          return !!refreshToken; 
        }

        return true;
      } catch (jwtError) {
        console.error(jwtError);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  needsTokenRefresh() {
    try {
      const token = this.getToken();
      const refreshToken = this.getRefreshToken();

      if (!token || !refreshToken) {
        return false;
      }

      const decodedToken = jwtDecode(token);
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const timeLeft = decodedToken.exp - nowInSeconds;
      return timeLeft <= 60;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  },

  clearToken() {
    this.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN);
  },

  clearRefreshToken() {
    this.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN);
  },

  clearAllTokens() {
    this.clearToken();
    this.clearRefreshToken();
  },
};
