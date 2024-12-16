import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";


export const useAuthStore = defineStore("auth", {
    state: () => (useStorage("auth", {
         token: "" ,
         message: "",
        })), 
    actions: {
        async login (user: string, password: string) {
            const response = await api.post("/auth/login", {username: user, password})
            if(response.data){
                this.token = response.data?.token
            }
        }
    } 
})