import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import type { UserRole } from '@/types/permissions'
import { usePermissionsStore } from '@/stores/permissionsStore'

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Datalyz'

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
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('../views/PrivacyPolicyView.vue'),
        meta: { title: 'Privacy Policy' }
    },
    {
        path: '/cookies',
        name: 'Cookies',
        component: () => import('../views/CookiesView.vue'),
        meta: { title: 'Cookie Policy' }
    },
    {
        path: '/user-data',
        name: 'UserData',
        component: () => import('../views/UserDataView.vue'),
        meta: {
            title: 'My Data',
            requiresAuth: true,
            roles: ['Administrator', 'User']
        }
    },
    {
        path: '/research',
        name: 'Research',
        component: () => import('../views/ResearchView.vue'),
        meta: {
            title: 'Research',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist']
        }
    },
    {
        path: '/data-management',
        name: 'DataManagement',
        component: () => import('../views/DataManagementView.vue'),
        meta: {
            title: 'Data Management',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist']
        }
    },
    {
        path: '/admin-panel',
        name: 'AdminPanel',
        component: () => import('../views/AdminPanelView.vue'),
        meta: {
            title: 'Admin Panel',
            requiresAuth: true,
            roles: ['Administrator']
        }
    },
    {
        path: '/user-preferences',
        name: 'UserPreferences',
        component: () => import('../views/UserPreferencesView.vue'),
        meta: {
            title: 'Preferences',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist', 'User']
        }
    },
    {
        path: '/user-settings',
        name: 'UserSettings',
        component: () => import('../views/UserSettingsView.vue'),
        meta: {
            title: 'Settings',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist', 'User']
        }
    },
    {
        path: '/vpn-installation',
        name: 'VpnInstallation',
        component: () => import('../views/VpnInstallationView.vue'),
        meta: {
            title: 'VPN Installation',
            requiresAuth: true,
            roles: ['Administrator', 'Scientist', 'User']
        }
    },
    {
        path: '/onboarding',
        name: 'Onboarding',
        component: () => import('../views/OnboardingView.vue'),
        meta: {
            title: 'Privacy Preferences'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFoundView.vue'),
        meta: {
            title: 'Page Not Found'
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
    document.title = `${APP_NAME} | ${to.meta.title}`

    const permissionsStore = usePermissionsStore()
    const requiresAuth = to.meta.requiresAuth
    const allowedRoles = to.meta.roles

    if (requiresAuth) {
        const currentRole = permissionsStore.currentRole

        if (!currentRole) {
            next({ name: 'Login' })
            return
        }

        if (allowedRoles && allowedRoles.length > 0) {
            if (!allowedRoles.includes(currentRole)) {
                next({ name: 'UserDashboard' })
                return
            }
        }
    }

    next()
})

export default router
