import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: 'Home'
        }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
          title: 'Contact'
      }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
        meta: {
            title: 'About'
        }
    },
    {
        path: '/services',
        name: 'Services',
        component: () => import('../views/ServicesView.vue'),
        meta: {
            title: 'Services'
        }
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../views/StatisticsView.vue'),
        meta: {
            title: 'Statistics'
        }
    },
    {
        path: '/terms-of-services',
        name: 'TermsOfServices',
        component: () => import('../views/TermsOfServicesView.vue'),
        meta: {
            title: 'Terms of Services'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue'),
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
