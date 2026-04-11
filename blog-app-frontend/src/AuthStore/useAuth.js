import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Import persist middleware

export const useAuth = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      // LOGIN LOGIC
      login: async (userCredWithRole) => {
        let { role, ...userCredObj } = userCredWithRole;
        try {
          set({ loading: true, error: null });

          let res = await axios.post(
            "https://capstone-project-rbl1.onrender.com/common-api/authenticate",
            userCredObj,
            { withCredentials: true }
          );

          set({
            loading: false,
            isAuthenticated: true,
            currentUser: res.data.payload,
          });
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: err.response?.data?.message || "Login failed",
          });
        }
      },

      // LOGOUT LOGIC
      logout: async () => {
        try {
          set({ loading: true, error: null });
          await axios.get("https://capstone-project-rbl1.onrender.com/common-api/logout", {
            withCredentials: true,
          });
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
          });
          // Clear storage on logout
          localStorage.removeItem("user-auth-storage");
        } catch (err) {
          set({
            loading: false,
            error: err.response?.data?.message || "Logout failed",
          });
        }
      },

      // SESSION CHECK (Run this in your App.jsx useEffect)
      checkAuth: async () => {
        set({ loading: true });
        try {
          let res = await axios.get("https://capstone-project-rbl1.onrender.com/common-api/check-auth", {
            withCredentials: true,
          });
          set({
            loading: false,
            isAuthenticated: true,
            currentUser: res.data.payload,
          });
        } catch (err) {
          set({
            loading: false,
            isAuthenticated: false,
            currentUser: null,
            error: null,
          });
        }
      },
    }),
    {
      name: "user-auth-storage", // 2. Unique name for the localStorage key
      partialize: (state) => ({ 
        currentUser: state.currentUser, 
        isAuthenticated: state.isAuthenticated 
      }), // 3. Only save the user data, not the loading/error states
    }
  )
);