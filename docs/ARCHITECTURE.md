# Technical Architecture

## Overview

Vue 3 SPA with client-side routing, Pinia state management, and API access via Axios. The backend is a separate Go REST API.

```
Browser
  └── Vue 3 SPA (Vite)
        ├── Vue Router       → navigation + auth guards
        ├── Pinia Stores     → global persisted state
        ├── Axios            → HTTP calls to REST API
        └── vue-i18n         → FR/EN translations
```

---

## Initialization (`main.ts`)

Plugin registration order (order matters):

```ts
app.use(pinia)   // 1. Pinia first — router guards depend on it
app.use(router)  // 2. Router after Pinia
app.use(i18n)
app.use(VueApexCharts)
app.mount('#app')
configureAxios(router)     // 3. Axios after mount — needs router for redirects
brandStore.applyBrandColor()
```

> **Important**: Pinia must be registered before the router. The `beforeEach` guard calls `usePermissionsStore()` on startup — if Pinia is not active yet, the app crashes.

---

## Routing

File: `src/router/index.ts`

### Public Routes

| Path | View | Title |
|---|---|---|
| `/` | `HomeView` | Home |
| `/login` | `LoginView` | Login |
| `/register` | `RegisterView` | Register |
| `/forgot-password` | `ForgotPasswordView` | Forgot Password |
| `/reset-password` | `ResetPasswordView` | Reset Password |
| `/verify-email` | `VerifyEmailView` | Verify Email |
| `/contact` | `ContactView` | Contact |
| `/about` | `AboutView` | About |
| `/services` | `ServicesView` | Services |
| `/statistics` | `StatisticsView` | Statistics |
| `/terms-of-service` | `TermsOfServicesView` | Terms of Service |
| `/our-work` | `OurWorkView` | Our Work |
| `/get-involved` | `GetInvolvedView` | Get Involved |
| `/about-us` | `AboutUsView` | About Us |
| `/onboarding` | `OnboardingView` | Onboarding |

### Protected Routes

| Path | View | Allowed Roles |
|---|---|---|
| `/user-dashboard` | `UserDashboardView` | All authenticated users |
| `/scientist-management` | `ScientistManagementView` | `Administrator` only |

### Authentication Guard

```ts
router.beforeEach((to, _from, next) => {
  // 1. Update page title
  document.title = `${APP_NAME} | ${to.meta.title}`

  // 2. Check auth requirement
  if (to.meta.requiresAuth) {
    const { currentRole } = usePermissionsStore()

    if (!currentRole) {
      next({ name: 'Login' })     // Not logged in → redirect to login
      return
    }

    if (to.meta.roles && !to.meta.roles.includes(currentRole)) {
      next({ name: 'Dashboard' }) // Wrong role → redirect to dashboard
      return
    }
  }

  next()
})
```

---

## State Management (Pinia)

### `userStore`

Manages the user session on the UI side.

| State | Type | Description |
|---|---|---|
| `email` | `string` | Logged-in user's email |
| `username` | `string` | Username |
| `role` | `UserRole` | Current role |
| `isAuthenticated` | `boolean` | Auth status |

### `permissionsStore`

Handles access control. **Persisted in localStorage.**

| State | Type | Description |
|---|---|---|
| `currentRole` | `UserRole \| null` | Role persisted across sessions |
| `currentPermissions` | `RoleConfig` | Permission config for the active role |
| `availableRoutes` | `RouteConfig[]` | Routes accessible by the current role |

Permissions matrix:

| Permission | Administrator | Scientist | User |
|---|:---:|:---:|:---:|
| Manage users | ✓ | — | — |
| Export data | ✓ | ✓ | — |
| View analytics | ✓ | ✓ | — |
| View own data | ✓ | ✓ | ✓ |

### `brandStore`

White-label branding. Reads env vars at startup and applies them as CSS variables.

| State | Source |
|---|---|
| `appName` | `VITE_APP_NAME` |
| `primaryColor` | `VITE_PRIMARY_COLOR` |

### `settingsStore`

UI preferences. **Persisted in localStorage.**

| State | Default | Description |
|---|---|---|
| `isDarkMode` | OS preference | Dark mode toggle |
| `locale` | `navigator.language` | Language (`fr` or `en`) |

---

## API Layer (`src/client/`)

### Authentication (`clientAuth.ts`)

| Function | Endpoint | Method |
|---|---|---|
| `login()` | `/login` | POST |
| `register()` | `/register` | POST |
| `verifyEmail()` | `/verify-email?token=` | GET |
| `resendVerificationEmail()` | `/resend-verification` | POST |
| `forgotPassword()` | `/password-reset/request` | POST |
| `resetPassword()` | `/password-reset/confirm` | POST |
| `fetchCurrentUser()` | `/user` | GET |

**Login error codes handled:**
- `401` → Invalid credentials (generic error message)
- `403` → Email not verified (shows "Resend verification email" button)

### Admin (`clientAdmin.ts`)

| Function | Endpoint | Method |
|---|---|---|
| `getScientists()` | `/admin/scientists` | GET |
| `addScientist()` | `/admin/scientists` | POST |
| `deleteScientist()` | `/admin/scientists/:id` | DELETE |

### JWT Token (`clientCommon.ts`)

Token is stored in a **cookie** (`key: 'token'`).

```ts
storeToken(jwt)              // Save token
getToken()                   // Read token
getAuthenticatedHeader()     // → { Authorization: 'Bearer <token>' }
deleteToken()                // Clear token (logout)
```

### Axios Configuration (`axiosConfiguration.ts`)

- Base URL: `VITE_API_URL`
- Content-Type: `application/json`
- Response interceptor: redirects to `/login` on any `401` response

---

## Internationalization

Languages: **French** (`fr`) and **English** (`en`).  
Files: `src/assets/locales/fr.json` and `en.json`.

The active language is persisted in `localStorage` via `settingsStore`. Fallback locale is `en`.

**Using translations in a component:**

```ts
// Script
const { t } = useI18n()
t('login.error')

// Template
{{ $t('login.submit') }}
```

**Adding a new translation key:**

1. Add the key to `en.json`
2. Add the translation to `fr.json`
3. Use `t('my.key')` in the component

---

## Layouts

Three layouts wrap views depending on context:

| Layout | Usage |
|---|---|
| `LayoutShowcase` | Public pages (home, login, register…) |
| `LayoutDashboard` | Authenticated pages (dashboard, management…) |
| `LayoutApp` | Root wrapper |

---

## Components

```
src/components/
├── common/         # Navbar, Sidebar, TopBar, Footer, Layouts…
├── home/           # Homepage sections (HeroBanner, Purpose, TheTeam…)
├── dashboard/      # Charts (DataCollectionChart, UserActivityChart…)
├── aboutUs/        # TeamGrid, TeamMember, ProjectDescription…
├── getInvolved/    # HowItWorks, DataPurpose, TrackingCard…
└── ourWork/        # OurWorkHero, ProjectGoal
```

---

## Dark Mode

The `.dark` class is toggled on `<html>`. Tailwind uses `darkMode: 'class'` to activate `dark:` variants.

```ts
// App.vue — on mount
const settings = useSettingsStore()
watch(settings.isDarkMode, (val) => {
  document.documentElement.classList.toggle('dark', val)
}, { immediate: true })
```
