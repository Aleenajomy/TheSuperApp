import { create } from "zustand";

export const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("super_app_user")) || {
    name: "",
    username: "",
    email: "",
    mobile: "",
  },
  categories: JSON.parse(localStorage.getItem("super_app_categories")) || [],
  notes: localStorage.getItem("super_app_notes") || "",

  setUser: (userData) => {
    localStorage.setItem("super_app_user", JSON.stringify(userData));
    set({ user: userData });
  },
  setCategories: (categoryArray) => {
    localStorage.setItem("super_app_categories", JSON.stringify(categoryArray));
    set({ categories: categoryArray });
  },
  setNotes: (noteText) => {
    localStorage.setItem("super_app_notes", noteText);
    set({ notes: noteText });
  },
  resetStore: () => {
    localStorage.removeItem("super_app_user");
    localStorage.removeItem("super_app_categories");
    localStorage.removeItem("super_app_notes");
    set({
      user: { name: "", username: "", email: "", mobile: "" },
      categories: [],
      notes: "",
    });
  },
}));
