<script setup>
import { ref, computed } from "vue";
import { useOpinionesStore } from '../store/opiniones'

const store = useOpinionesStore()

const emit = defineEmits(['onSubmit'])

//Variables del formulario
const userId = ref("")
const email = ref("")
const password = ref("")
const rating = ref(0)
const opcionesSave = ref([])
const loading = ref(false)
const local = ref("")
const opcionesBuenas = ref([
    { text: "Rapidez", value: "Rapidez" },
    { text: "Buena predisposición", value: "Buena predisposicion" },
    { text: "Buen precio", value: "Buen precio" },
])
const opcionesMalas = ref([
    {
        text: "Pedido no entregado a tiempo",
        value: "Pedido no entregado a tiempo",
    },
    { text: "No llegó lo que pedí", value: "No llegó lo que pedí" },
    { text: "No estaba rico", value: "No estaba rico" },
])

//Validaciones
const validation = computed(() => userId.value.length > 4 && userId.value.length < 13)

const validationEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
})

const validationPassword = computed(() => {
    const numberRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    return numberRegex.test(password.value);
})

const hayError = computed(() => {
    return (
        !validation.value ||
        !validationEmail.value ||
        !validationPassword.value ||
        local.value.length === 0 ||
        rating.value === 0 ||
        opcionesSave.value.length === 0
    )
})

const opcionesByRating = computed(() => {
    if (rating.value >= 3) {
        return opcionesBuenas.value
    }
    return opcionesMalas.value
})

//Métodos
const onSubmit = async () => {
    loading.value = true
    if (hayError.value) return
    const opinion = {
        user: userId.value,
        email: email.value,
        local: local.value,
        rating: rating.value,
        calificacion: opcionesSave.value,
    };
    await store.guardarOpinion(opinion)
    resetForm();
    loading.value = false
}
const resetForm = () => {
    userId.value = ""
    email.value = ""
    password.value = ""
    rating.value = 0
    opcionesSave.value = []
    local.value = ""
}
</script>
<template>
    <div class="container flex justify-center py-8">
        <div class="form">

            <label for="username">Nombre de usuario</label>
            <input type="text" :class="['input input-bordered w-full', validation ? 'input-success' : 'input-error']"
                v-model="userId" />
            <p class="text-error" v-if="!validation && userId.length < 2">Tu nombre de usuario debe ser de 5 a 12
                carácteres</p>

            <label for="email">Email</label>
            <input type="email" :class="['input input-bordered w-full', validationEmail ? 'input-success' : 'input-error']"
                v-model="email" />
            <p class="text-error" v-if="!validationEmail"> Formato de email inválido </p>

            <label for="password">Password</label>
            <input type="password"
                :class="['input input-bordered w-full', validationPassword ? 'input-success' : 'input-error']"
                v-model="password" />
            <p class="text-error" v-if="!validationPassword">
                Ingrese una contraseña de 6 carácteres y 1 número
            </p>

            <p class="tituloRadio">¿Dónde realizaste el pedido?</p>
            <div class="radioContainer">
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" checked value="Santa Fe"
                            v-model="local" />
                        <span class="localRadio label-text w-40">Local Santa Fe</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" value="Santo Tome"
                            v-model="local" />
                        <span class="localRadio label-text w-40">Local Santo Tomé</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" value="Parana"
                            v-model="local" />
                        <span class="localRadio label-text w-40 ">Local Paraná</span>
                    </label>
                </div>
            </div>

            <p class="tituloRating">Puntuación</p>
            <div class="rating rating-lg flex justify-center">
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="1" v-model="rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="2" v-model="rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="3" v-model="rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="4" v-model="rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="5" v-model="rating" />
            </div>

            <template v-if="rating > 0">
                <p class="tituloRadio">¿Por qué tu calificación?</p>

                <div class="flex flex-col items-center">
                    <div class="form-control w-full" v-for="(opciones, index) in opcionesByRating" :key="index">
                        <label class="cursor-pointer label">
                            <span class="label-text text-xl">{{ opciones.text }}</span>
                            <input type="checkbox" :value="opciones.value" class="toggle toggle-error"
                                v-model="opcionesSave" />
                        </label>
                    </div>
                </div>
            </template>

            <button class="btn btn-outline btn-error mt-16" type="submit" @click="onSubmit">
                <span v-if="!loading">Enviar</span>
                <span v-else class="loading loading-spinner"></span>
            </button>
        </div>
    </div>
</template>
  
  
<style scoped>
.form {
    width: 600px;
    padding: 50px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.1px);
    -webkit-backdrop-filter: blur(11.1px);
    border: 1px solid rgba(255, 255, 255, 0.53);
}

.invalid-feedback {
    color: rgb(80, 29, 29);
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.tituloRadio {
    font-weight: bold;
    color: white;
    margin-top: 40px;
    text-align: center;
    margin-bottom: 0px;
}

.radioContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.localRadio {
    color: whitesmoke;
}

.tituloRating {
    font-weight: bold;
    color: white;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 0px;
}

label {
    color: white;
    font-weight: 700;
}

#checkboxes {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 15px;
    margin-bottom: 40px;
}
</style>