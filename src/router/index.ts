import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import type { UserRole } from '@/types/permissions'
import { usePermissionsStore } from '@/stores/permissionsStore'
import { useUserStore } from '@/stores/userStore'

// Extension du type RouteRecordRaw pour inclure les rôles
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    roles?: UserRole[]
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
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
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/ForgotPasswordView.vue'),
        meta: {
            title: 'Forgot Password'
        }
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('../views/ResetPasswordView.vue'),
        meta: {
            title: 'Reset Password'
        }
    },
    {
        path: '/verify-email',
        name: 'VerifyEmail',
        component: () => import('../views/VerifyEmailView.vue'),
        meta: {
            title: 'Verify Email'
        }
    },
    {
        path: '/our_work',
        name: 'OurWork',
        component: () => import('../views/OurWorkView.vue'),
        meta: {
            title: 'Our Work'
        }
    },
    {
        path: '/get_involved',
        name: 'GetInvolved',
        component: () => import('../views/GetInvolvedView.vue'),
        meta: {
            title: 'Get Involved'
        }
    },
    {
        path: '/about_us',
        name: 'AboutUs',
        component: () => import('../views/AboutUsView.vue'),
        meta: {
            title: 'About Us'
        }
    },
    {
        path: '/user-dashboard',
        name: 'UserDashboard',
        component: () => import('../views/UserDashboardView.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist', 'User']
        }
    },
    {
        path: '/scientist-management',
        name: 'ScientistManagement',
        component: () => import('../views/ScientistManagementView.vue'),
        meta: {
            title: 'Scientist Management',
            requiresAuth: true,
            roles: ['Administrator']
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || {left: 0, top: 0}
    }
})

router.beforeEach((to, _from, next) => {
    // Mise à jour du titre
    document.title = `Datalyz | ${to.meta.title}`

    // Vérification des permissions
    const permissionsStore = usePermissionsStore()
    const userStore = useUserStore()
    const requiresAuth = to.meta.requiresAuth
    const allowedRoles = to.meta.roles

    // TEMPORAIRE: Définir un rôle par défaut 'User' si l'utilisateur est authentifié sans rôle
    // Cette logique sera retirée quand le backend renverra le rôle lors du login
    if (userStore.isAuthenticated && !permissionsStore.currentRole) {
        permissionsStore.setRole('User')
    }

    // Si la route nécessite une authentification
    if (requiresAuth) {
        const currentRole = permissionsStore.currentRole

        // Pas de rôle défini → rediriger vers login
        if (!currentRole) {
            next({ name: 'Login' })
            return
        }

        // Si la route a des rôles spécifiques, vérifier l'accès
        if (allowedRoles && allowedRoles.length > 0) {
            if (!allowedRoles.includes(currentRole)) {
                // Rôle non autorisé → rediriger vers dashboard
                next({ name: 'UserDashboard' })
                return
            }
        }
    }

    next()
})

export default router
