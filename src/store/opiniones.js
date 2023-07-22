import axios from "axios"
import router from "../router/index"
import { defineStore } from 'pinia'

export const useOpinionesStore = defineStore('opiniones', {
    state: () => ({
        opiniones: [],
        loading: false
    }),
    actions: {
        async guardarOpinion(opinion) {
            await axios
                .post("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones", opinion)
                .then(() => {
                    router.push({ name: "opinionesTabla" });
                })
        },
        async traerOpiniones() {
            this.loading = true
            await axios
                .get("https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones")
                .then((res) => {
                    this.opiniones = res.data
                    this.loading = false
                })
        },
    },
    persist: true
})