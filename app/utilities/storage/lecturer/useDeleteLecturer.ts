import { create } from "zustand";

type LecturerStore = {
  lecturer: any;
  loading: boolean;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
  deleteLecturer: (id: string) => Promise<void>;
};

export const useDeleteLecturer = create<LecturerStore>((set) => ({
  lecturer: {},
  loading: false,
  add: () => set((state) => ({ lecturer: state.lecturer + 1 })),
  remove: () => set((state) => ({ lecturer: state.lecturer - 1 })),
  removeAll: () => set({ lecturer: 0 }),
  deleteLecturer: async (lecturerId) => {
    try {
      set({ loading: true });

      // Make your DELETE API call here with JSON payload
      await fetch("/api/v1/AUTH/manageUser/lecturer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lecturerId,
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
