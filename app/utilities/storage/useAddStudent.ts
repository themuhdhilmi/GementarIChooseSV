import { create } from "zustand";

enum SuccessState {
  NONE = "NONE",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

interface StudentData {
  name: string;
  email: string;
  matricNumber: string;
  password: string;
  confirmPassword: string;
  sessionYearID: string;
  track: string;
}

type StudentStore = {
  loading: boolean;
  data: any;
  success: SuccessState;
  sendData: (postData: StudentData) => Promise<void>;
};

export const useAddStudent = create<StudentStore>((set) => ({
  data: {},
  loading: false,
  success: SuccessState.NONE,
  sendData: async (postData) => {
    try {
      // Make your fetch API call here
      const response = await fetch("/api/v1/AUTH/manageUser/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      // Update the state based on the fetched data
      if (response.ok) {
        set((state) => ({
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.SUCCESS,
        }));
      } else {
        set((state) => ({
          data: data, // Adjust this based on your API response structure
          loading: false,
          success: SuccessState.ERROR,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false, success: SuccessState.ERROR });
    }
  },
}));
