import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { User } from "../types/user";

interface AuthState {
  authUser: User | null;
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
        set({ authUser: res.data as User });
      } else {
        console.error("Invalid user data received");
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
