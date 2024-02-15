import { create } from "zustand";

type Lecturertore = {
  lecturer: any;
  loading: boolean;
  doneFetch: boolean;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  fetchData: (email: string) => Promise<void>;
};

export const useGetLecturer = create<Lecturertore>((set) => ({
  lecturer: {},
  loading: false,
  doneFetch: true,
  add: () => set((state) => ({ lecturer: state.lecturer + 1 })),
  remove: () => set((state) => ({ lecturer: state.lecturer - 1 })),
  removeAll: () => set({ lecturer: 0 }),
  fetchData: async (email: string) => {
    try {
      set({ loading: true });
      set({ doneFetch: false });
      // Make your fetch API call here
      const response = await fetch(
        `/api/v1/AUTH/manageUser/lecturer?email=${email}&type=single`,
      );
      const data = await response.json();

      // Update the state based on the fetched data
      set((state) => ({
        lecturer: data, // Adjust this based on your API response structure
        loading: false,
        doneFetch: true,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));
