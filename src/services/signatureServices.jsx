import CryptoJS from "crypto-js";
import { AuthService } from "./authServices";
import authStore from "@/stores/authStore"; 

export const SignatureService = {
  generateTimestamp: () => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 7);
    const formattedTime = currentTime.toISOString().slice(0, 19) + "+07:00";
    return formattedTime;
  },

  generateAuthSignature: (httpMethod, endPointURL, requestBody, timestamp, clientSecret) => {
    try {
      let bodyString = "";
      if (typeof requestBody === "object") {
        bodyString = JSON.stringify(requestBody);
      } else if (typeof requestBody === "string") {
        bodyString = requestBody;
      }

      const minifiedBody = bodyString.replace(/\s+/g, "").toLowerCase();
      const bodyHash = CryptoJS.SHA256(minifiedBody).toString(CryptoJS.enc.Hex);
      const stringToSign = `${httpMethod}:${endPointURL}:${bodyHash}:${timestamp}`;
      const signature = CryptoJS.HmacSHA512(stringToSign, clientSecret).toString(CryptoJS.enc.Hex);
      return signature;
    } catch (error) {
      console.error("Error generating auth signature:", error);
      throw error;
    }
  },

  generateRefreshSignature: (httpMethod, endPointURL, timestamp, refreshToken, clientSecret) => {
    try {
      const stringToSign = `${httpMethod}:${endPointURL}:${timestamp}:${refreshToken}`;
      const inputWordArray = CryptoJS.enc.Latin1.parse(clientSecret);
      const signWordArray = CryptoJS.enc.Latin1.parse(stringToSign);
      const hash = CryptoJS.HmacSHA512(signWordArray, inputWordArray);
      let result = hash.toString(CryptoJS.enc.Hex);
      result = result.toLowerCase();
      return result;
    } catch (error) {
      console.error("Error generating refresh signature:", error);
      throw error;
    }
  },

  generateLoginHeaders: (httpMethod, endPointURL, requestBody) => {
    const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;
    const clientId = import.meta.env.VITE_APP_CLIENT_ID;
    if (!clientSecret) {
      throw new Error("Client secret not found in environment variables");
    }
    const timestamp = SignatureService.generateTimestamp();
    const signature = SignatureService.generateAuthSignature(httpMethod, endPointURL, requestBody, timestamp, clientSecret);
    return { "X-TIMESTAMP": timestamp, "X-SIGNATURE": signature, "X-CLIENT-KEY": clientId };
  },

  generateLogoutHeaders: (httpMethod, endPointURL, requestBody) => {
    const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;
    const clientId = import.meta.env.VITE_APP_CLIENT_ID;
    const accessToken = AuthService.getToken();

    if (!clientSecret) {
      throw new Error("Client secret not found in environment variables");
    }
    if (!accessToken) {
      throw new Error("Access token missing for logout");
    }

    const timestamp = SignatureService.generateTimestamp();
    const signature = SignatureService.generateServiceSignature(
      httpMethod,
      endPointURL,
      requestBody,
      timestamp,
      accessToken,
      clientSecret,
    );

    return {
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": signature,
      "X-CLIENT-KEY": clientId,
    };
  },

  generateRefreshHeaders: async () => {
    const clientId = import.meta.env.VITE_APP_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;
    const refreshToken = AuthService.getRefreshToken();
    const endPointURL = "/api/sifina-middleware/bo/v1/refresh";

    if (!clientSecret || !refreshToken) {
      throw new Error("Client secret or refresh token missing");
    }

    const user = authStore.getState().getDecryptedUser();
    const userEmail = user?.email || "";
    const timestamp = SignatureService.generateTimestamp();
    const signature = SignatureService.generateRefreshSignature("GET", endPointURL, timestamp, refreshToken, clientSecret);
    return {
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": signature,
      EMAIL: userEmail,
      "X-CLIENT-KEY": clientId,
    };
  },

  generateServiceSignature: (httpMethod, endPointURL, requestBody, timestamp, accessToken, clientSecret) => {
    try {
      let bodyString = "";
      if (typeof requestBody === "object") {
        bodyString = JSON.stringify(requestBody);
      } else if (typeof requestBody === "string") {
        bodyString = requestBody;
      }

      const minifiedBody = bodyString.replace(/\s+/g, "").toLowerCase();
      const bodyHash = CryptoJS.SHA256(minifiedBody).toString(CryptoJS.enc.Hex);
      const stringToSign = `${httpMethod}:${endPointURL}:${accessToken}:${bodyHash}:${timestamp}`;
      const signature = CryptoJS.HmacSHA512(stringToSign, clientSecret).toString(CryptoJS.enc.Hex);

      return signature;
    } catch (error) {
      console.error("Error generating service signature:", error);
      throw error;
    }
  },

  generateServiceHeaders: (httpMethod, endPointURL, requestBody, freshToken = null) => {
    const clientId = import.meta.env.VITE_APP_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET;
    const accessToken = freshToken || AuthService.getToken();
    if (!clientSecret || !accessToken) {
      throw new Error("Client secret or access token missing");
    }

    const timestamp = SignatureService.generateTimestamp();
    const isBlinkApi = endPointURL.includes("/blink/");
    

    const user = authStore.getState().getDecryptedUser();
    const userEmail = user?.email || "";

    let signature;
    if (isBlinkApi) {
      signature = SignatureService.generateAuthSignature(httpMethod, endPointURL, requestBody, timestamp, clientSecret);
    } else {
      signature = SignatureService.generateServiceSignature(
        httpMethod,
        endPointURL,
        requestBody,
        timestamp,
        accessToken,
        clientSecret,
      );
    }

    return {
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": signature,
      "X-CLIENT-KEY": clientId,
      EMAIL: userEmail,
    };
  },
};