import {createRouter, createWebHistory} from 'vue-router'

import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            title: 'Login'
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {left: 0, top: 0}
    }
})

router.beforeEach((to, from, next) => {
    document.title = `Datalyz | ${to.meta.title}`
    next()
})

export default router
