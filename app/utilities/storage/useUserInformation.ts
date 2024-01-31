import { create } from "zustand";

type UseStore = {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: string;
  image: string;
  fetchData: () => Promise<void>;
};

export const useUserInformation = create<UseStore>((set) => ({
  isLoggedIn: false,
  name: "Guest",
  email: "",
  role: "GUEST",
  image: "",
  bearerSessionKey: "",
  fetchData: async () => {
    try {
      const response = await fetch("/api/v1/AUTH/global/user");
      const data = await response.json();

      // Update the state based on the fetched data
      if (response.ok) {
        set((state) => ({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          image: data.user.image ?? "",
        }));
        set({ isLoggedIn: true });
      } else {
        set({ isLoggedIn: false });
        set((state) => ({
          name: "Guest",
          email: "",
          role: "GUEST",
          image: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ isLoggedIn: false });
    }
  },
}));
