import { create } from "zustand";

type LecturerStore = {
  lecturers: any;
  loading: boolean;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  fetchData: (sessionId: string) => Promise<void>;
};

export const useGetLecturers = create<LecturerStore>((set) => ({
  lecturers: {},
  loading: false,
  add: () => set((state) => ({ lecturers: state.lecturers + 1 })),
  remove: () => set((state) => ({ lecturers: state.lecturers - 1 })),
  removeAll: () => set({ lecturers: 0 }),
  fetchData: async (sessionId: string) => {
    try {
      set({ loading: true });
      // Make your fetch API call here
      const response = await fetch(
        `/api/v1/AUTH/manageUser/lecturer?email=lecturerfaizul@example.com&selection=ALL&sessionID=${sessionId}`,
      );
      const data = await response.json();

      // Update the state based on the fetched data
      set((state) => ({
        lecturers: data, // Adjust this based on your API response structure
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));
