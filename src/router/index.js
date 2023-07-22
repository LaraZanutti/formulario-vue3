import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'cargarOpinion',
        component: () => import('../views/CargarOpinion.vue')
    },
    {
        path: '/opiniones',
        name: 'opinionesTabla',
        component: () => import('../views/OpinionesTabla.vue')
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router