import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decryptData, encryptData } from "../utils/helpers";

const authStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      error: null,

      setUser: (userData) => {
        try {
          const encryptedUser = {
            email: encryptData(userData.email || ""),
            role: encryptData(userData.role || ""),
            id: encryptData(userData.id || ""),
          };

          set({
            user: encryptedUser,
            isAuthenticated: true,
            error: null,
          });
        } catch (error) {
          console.error(error);
          set({ error: "Failed to set user data" });
        }
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setError: (message) => {
        set({ error: message });
      },

      clearError: () => {
        set({ error: null });
      },

      getDecryptedUser: () => {
        const { user } = get();

        if (!user) {
          return null;
        }

        try {
          return {
            email: decryptData(user.email),
            role: decryptData(user.role),
            id: decryptData(user.id),
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    {
      name: "user-kiosk-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default authStore;
