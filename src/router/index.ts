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
            title: 'Dashboard'
        }
    },
    {
        path: '/onboarding',
        name: 'Onboarding',
        component: () => import('../views/OnboardingView.vue'),
        meta: {
            title: 'Privacy Preferences'
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
    document.title = `Datalyz | ${to.meta.title}`
    next()
})

export default router
