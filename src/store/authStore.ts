import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { User } from "../types/user";
import type { Admin } from "../types/admin";
import type { Trainer } from "../types/trainer";

interface AuthState {
  authUser: ((User | Admin | Trainer) & { role?: string }) | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  signup: (formdata: unknown) => Promise<unknown>;
}

// Try to hydrate authUser from localStorage so refreshes keep the user signed in
const hydrateAuthUser = ():
  | ((User | Admin | Trainer) & { role?: string })
  | null => {
  try {
    const raw = localStorage.getItem("authUser");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse stored authUser", e);
    return null;
  }
};

export const authStore = create<AuthState>((set) => ({
  authUser: hydrateAuthUser(),
  isLoggingIn: false,
  isSigningUp: false,

  signup: async (formdatapayload: unknown) => {
    set({ isSigningUp: true });
    console.log(formdatapayload);

    try {
      const res = await axiosInstance.post(
        "/auth/user/register",
        formdatapayload
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (email: string, password: string, role: string) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
        role,
      });
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
          default:
            userData = null;
        }

        if (userData) {
          const stored = { ...userData, role };
          // persist to localStorage so refresh doesn't lose auth
          try {
            localStorage.setItem("authUser", JSON.stringify(stored));
          } catch (e) {
            console.warn("Failed to persist authUser to localStorage", e);
          }
          set({ authUser: stored });
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

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } catch (e) {
      console.warn("Failed to remove authUser from localStorage", e);
    }
    set({ authUser: null });
  },
}));
