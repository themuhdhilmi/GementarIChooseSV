import { create } from "zustand";

type CartStore = {
  cart: number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: 0,
  add: () => set((state) => ({ cart: state.cart + 1 })),
  remove: () => set((state) => ({ cart: state.cart - 1 })),
  removeAll: () => set({ cart: 0 }),
}));
