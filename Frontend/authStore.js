import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        set({ user: data.user, token: data.token });
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        return data;
      },

      register: async (name, email, password) => {
        const { data } = await api.post("/auth/register", { name, email, password });
        set({ user: data.user, token: data.token });
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        return data;
      },

      logout: () => {
        set({ user: null, token: null });
        delete api.defaults.headers.common["Authorization"];
      },

      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
        }
      },
    }
  )
);

export default useAuthStore;
