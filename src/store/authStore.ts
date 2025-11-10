import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { User } from "../types/user";
import type { Admin } from "../types/admin";
import type { Trainer } from "../types/trainer";

interface AuthState {
  authUser: (User | Admin | Trainer) & { role?: string } | null;
  isLoggingIn: boolean;
  isSigningIn: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningIn: false,

  login: async (email: string, password: string, role: string) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
        role,
      });
      console.log("result===>", res);

      if (res.data) {
        let userData;
        switch (role) {
          case "user":
            userData = res.data.user;
            break;
          case "trainer":
            userData = res.data.trainer;
            break;
          case "admin":
            userData = res.data.admin;
            break;
        }

        if (userData) {
          set({ authUser: { ...userData, role } });
        } else {
          console.error(`${role} data is missing in the response`);
        }
      } else {
        console.error("Invalid response data received");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
