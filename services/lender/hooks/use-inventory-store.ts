import { create } from "zustand";
import { Item, Category } from "../query/item.service";
import { createItemAction, updateItemAction, deleteItemAction } from "../actions/item.actions";

interface InventoryState {
  items: Item[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setItems: (items: Item[]) => void;
  setCategories: (categories: Category[]) => void;
  addItem: (values: any) => Promise<boolean>;
  updateItem: (id: string, values: any) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  categories: [],
  isLoading: false,
  error: null,

  setItems: (items) => set({ items }),
  setCategories: (categories) => set({ categories }),
  setError: (error) => set({ error }),

  addItem: async (values) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createItemAction(values);
      if (result.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: result.error || "Failed to add item", isLoading: false });
        return false;
      }
    } catch (err) {
      set({ error: "An unexpected error occurred", isLoading: false });
      return false;
    }
  },

  updateItem: async (id, values) => {
    set({ isLoading: true, error: null });
    try {
      const result = await updateItemAction(id, values);
      if (result.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: result.error || "Failed to update item", isLoading: false });
        return false;
      }
    } catch (err) {
      set({ error: "An unexpected error occurred", isLoading: false });
      return false;
    }
  },

  deleteItem: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const result = await deleteItemAction(id);
      if (result.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: result.error || "Failed to delete item", isLoading: false });
        return false;
      }
    } catch (err) {
      set({ error: "An unexpected error occurred", isLoading: false });
      return false;
    }
  },
}));
