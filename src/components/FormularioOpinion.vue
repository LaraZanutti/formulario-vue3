<script setup>
import { ref, computed, reactive } from "vue";
import { useOpinionesStore } from '../store/opiniones'

const store = useOpinionesStore()

const emit = defineEmits(['onSubmit'])

//Variables del formulario
const form = reactive({
    userId: "",
    email: "",
    password: "",
    rating: 0,
    opcionesSave: [],
    local: ""
})
const loading = ref(false)
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
const validation = computed(() => form.userId.length > 4 && form.userId.length < 13)

const validationEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(form.email);
})

const validationPassword = computed(() => {
    const numberRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
    return numberRegex.test(form.password);
})

const hayError = computed(() => {
    return (
        !validation.value ||
        !validationEmail.value ||
        !validationPassword.value ||
        form.local.length === 0 ||
        form.rating === 0 ||
        form.opcionesSave.length === 0
    )
})

const opcionesByRating = computed(() => {
    if (form.rating >= 3) {
        return opcionesBuenas.value
    }
    return opcionesMalas.value
})

//Métodos
const onSubmit = async () => {
    loading.value = true
    if (hayError.value) {
        loading.value = false
        alert("Hay errores en la carga de datos, por favor complete todos los campos")
        return
    }
    const opinion = {
        user: form.userId,
        email: form.email,
        local: form.local,
        rating: form.rating,
        calificacion: form.opcionesSave,
    };
    await store.guardarOpinion(opinion)
    resetForm();
    loading.value = false
}
const resetForm = () => {
    form.userId = ""
    form.email = ""
    form.password = ""
    form.rating = 0
    form.opcionesSave = []
    form.local = ""
}
</script>
<template>
    <div class="container flex justify-center py-8">
        <div class="form">

            <label for="username">Nombre de usuario</label>
            <input type="text" :class="['input input-bordered w-full', validation ? 'input-success' : 'input-error']"
                v-model="form.userId" />
            <p class="text-error" v-if="!validation && form.userId.length < 2">Tu nombre de usuario debe ser de 5 a 12
                carácteres</p>

            <label for="email">Email</label>
            <input type="email" :class="['input input-bordered w-full', validationEmail ? 'input-success' : 'input-error']"
                v-model="form.email" />
            <p class="text-error" v-if="!validationEmail"> Formato de email inválido </p>

            <label for="password">Password</label>
            <input type="password"
                :class="['input input-bordered w-full', validationPassword ? 'input-success' : 'input-error']"
                v-model="form.password" />
            <p class="text-error" v-if="!validationPassword">
                Ingrese una contraseña de 6 carácteres y 1 número
            </p>

            <p class="tituloRadio">¿Dónde realizaste el pedido?</p>
            <div class="radioContainer">
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" value="Santa Fe"
                            v-model="form.local" />
                        <span class="localRadio label-text w-40">Local Santa Fe</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" value="Santo Tome"
                            v-model="form.local" />
                        <span class="localRadio label-text w-40">Local Santo Tomé</span>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer flex justify-center">
                        <input type="radio" name="radio-10" class="radio checked:bg-error mx-2" value="Parana"
                            v-model="form.local" />
                        <span class="localRadio label-text w-40 ">Local Paraná</span>
                    </label>
                </div>
            </div>

            <p class="tituloRating">Puntuación</p>
            <div class="rating rating-lg flex justify-center">
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="1" v-model="form.rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="2" v-model="form.rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="3" v-model="form.rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="4" v-model="form.rating" />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-error" :value="5" v-model="form.rating" />
            </div>

            <template v-if="form.rating > 0">
                <p class="tituloRadio">¿Por qué tu calificación?</p>

                <div class="flex flex-col items-center">
                    <div class="form-control w-full" v-for="(opciones, index) in opcionesByRating" :key="index">
                        <label class="cursor-pointer label">
                            <span class="label-text text-xl">{{ opciones.text }}</span>
                            <input type="checkbox" :value="opciones.value" class="toggle toggle-error"
                                v-model="form.opcionesSave" />
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