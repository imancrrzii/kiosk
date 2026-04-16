import DOMPurify from "dompurify";
import CryptoJS from "crypto-js";

export function renderWithPurify(data) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data),
      }}
    />
  );
}

export function purifyData(data) {
  return DOMPurify.sanitize(data);
}

export function encryptData(plaintext) {
  try {
    const secretKey = import.meta.env.VITE_APP_ENCRYPT_KEY_LOCAL;
    if (!secretKey) {
      throw new Error("Encryption key not found in environment variables");
    }
    return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw error;
  }
}

export function decryptData(encryptedData) {
  try {
    const secretKey = import.meta.env.VITE_APP_ENCRYPT_KEY_LOCAL;
    if (!secretKey) {
      throw new Error("Decryption key not found in environment variables");
    }
    const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error("Failed to decrypt data - invalid encrypted string or key");
    }

    return decrypted;
  } catch (error) {
    console.error("Error decrypting data:", error);
    throw error;
  }
}

export const formatPredictionDisplay = (minutes) => {
  if (minutes == null) return "Memuat…";
  if (minutes === 0) return "Langsung";
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `~${hours}j ${mins}m`;
  }
  return `~${minutes} menit`;
};