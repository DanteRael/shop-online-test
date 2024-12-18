import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  username: string;// Campo exemplo
  role: string;    
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    useStorage("auth", {
      token: "",
      message: "",
      username: "",
      role: "",
    }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    bearerToken: (state) => `Bearer ${state.token}`,
    isAdmin: (state) => state.role === "admin", 
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await api.post("/auth/login", { username, password });
        if (response.data) {
          this.token = response.data.token;
          this.message = response.data.message;

          const decoded: DecodedToken = jwtDecode(this.token);
          this.username = decoded.username;
          this.role = decoded.role;
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      }
    },
    logout() {
      this.token = "";
      this.message = "";
      this.username = "";
      this.role = "";
    },
  },
});
