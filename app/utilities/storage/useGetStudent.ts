import { create } from "zustand";

type StudentStore = {
  students: any;
  loading: boolean;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  fetchData: (email : string) => Promise<void>;
};

export const useGetStudent = create<StudentStore>((set) => ({
  students: {},
  loading: false,
  add: () => set((state) => ({ students: state.students + 1 })),
  remove: () => set((state) => ({ students: state.students - 1 })),
  removeAll: () => set({ students: 0 }),
  fetchData: async (email: string) => {
    try {
      set({ loading: true });
      // Make your fetch API call here
      const response = await fetch(
        `/api/v1/AUTH/manageUser/student?email=${email}&type=single`
      );
      const data = await response.json();

      // Update the state based on the fetched data
      set((state) => ({
        students: data, // Adjust this based on your API response structure
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));
