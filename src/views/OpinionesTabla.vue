<script setup>
import { useOpinionesStore } from '../store/opiniones'
import { onMounted } from "vue";

const store = useOpinionesStore()

onMounted(async () => {
    await store.traerOpiniones()
})

</script>

      
<template>
    <div class="container flex justify-center py-8">

        <span class="loading loading-spinner loading-lg mt-5" v-if="store.loading"></span>

        <table class="table w-2/3 bg-red-700 text-white" v-else>
            <!-- head -->
            <thead>
                <tr class="text-white font-bold text-base">
                    <th></th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Local</th>
                    <th>Rating</th>
                    <th>Calificacion</th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr v-for="opinion in store.opiniones" :key="opinion.id" class="hover">
                    <td>{{ opinion.id }}</td>
                    <td>{{ opinion.user }}</td>
                    <td>{{ opinion.email }}</td>
                    <td>{{ opinion.local }}</td>
                    <td>
                        <div class="flex gap-2 items-center">
                            <span>{{ opinion.rating }} </span>
                            <svg style="color: rgb(240, 208, 0);" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path
                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                                    fill="#f0d000"></path>
                            </svg>
                        </div>
                    </td>
                    <td>
                        <span v-for="calificacion in opinion.calificacion" :key="calificacion">
                            {{ calificacion }}
                            <br>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  
<style  scoped></style>