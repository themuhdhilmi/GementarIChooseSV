import { create } from "zustand";

type StudentStore = {
  students: any;
  loading: boolean;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  deleteStudent: (id: string) => Promise<void>;
};

export const useDeleteStudent = create<StudentStore>((set) => ({
  students: {},
  loading: false,
  add: () => set((state) => ({ students: state.students + 1 })),
  remove: () => set((state) => ({ students: state.students - 1 })),
  removeAll: () => set({ students: 0 }),
  deleteStudent: async (studentId) => {
    try {
      set({ loading: true });

      // Make your DELETE API call here with JSON payload
      await fetch("/api/v1/AUTH/manageUser/student", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: studentId,
        }),
      });

      // After successful deletion, you may want to refetch the data
      set((state) => ({
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false });
    }
  },
}));
