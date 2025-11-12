import { create } from "zustand";
import type { Video } from "../types/video";
import { axiosInstance } from "../lib/axios";

export const videoStore = create((set) => ({
  videos: null as Video | null,

  getVideo: async () => {
    try {
      const res = await axiosInstance.get("/video/view");
      console.log(res);
      const a = res.data.video;
      set({ videos: a });
    } catch (error) {
      console.log("Error in getting video", error);
    }
  },
}));
