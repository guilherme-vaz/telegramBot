/* eslint-disable no-undef */
import apiService from "@/api/apiService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    admin: {
      email: "",
      password: "",
    },
  }),

  actions: {
    async loginAdmin() {
      try {
        await apiService.login(this.admin);
        this.admin = {
          email: "",
          password: "",
        };
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },

    logoutAdmin() {
      this.admin = {
        email: "",
        password: "",
      };
      //   this.token = null;
      //   localStorage.removeItem("authToken");
    },
  },
});
