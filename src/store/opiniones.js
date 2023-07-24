import axios from "axios"
import router from "../router/index"
import { defineStore } from 'pinia'

const url = "https://64a59fc700c3559aa9bffd7a.mockapi.io/opiniones"

export const useOpinionesStore = defineStore('opiniones', {
    state: () => ({
        opiniones: [],
        loading: false
    }),
    actions: {
        async guardarOpinion(opinion) {
            await axios
                .post(url, opinion)
                .then(() => {
                    router.push({ name: "opinionesTabla" });
                })
                .catch(() => {
                    console.log("hay error")
                })
        },
        async traerOpiniones() {
            this.loading = true
            await axios
                .get(url)
                .then((res) => {
                    this.opiniones = res.data
                })
                .finally(() => {
                    this.loading = false
                })
                .catch(() => {
                    console.log("hay error")
                })
        },
    },
    persist: true
})