import { create } from "zustand";

type SessionStore = {
  sessions: any;
  loading: boolean;
  fetchData: () => Promise<void>;
};

export const useGetsessions = create<SessionStore>((set) => ({
  sessions: {},
  loading: false,
  fetchData: async () => {
    try {
      set({ loading: true });
      // Make your fetch API call here
      const response = await fetch("/api/v1/GLOBAL/sessions");
      const data = await response.json();

      // Update the state based on the fetched data
      set((state) => ({
        sessions: data, // Adjust this based on your API response structure
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));
