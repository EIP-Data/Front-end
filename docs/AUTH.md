# Authentication

## Overview

Authentication is token-based (JWT). The token is stored in a cookie and sent as a `Bearer` header on protected requests. Roles are assigned by the backend and mapped to frontend role names on login.

---

## Flows

### Register

```
User fills form → POST /register → success → success screen shown ("check your inbox")
                                            → redirect to /login on button click
                               → error   → error message shown
```

The register endpoint does **not** log the user in. No JWT is stored, no session is created. A verification email is sent by the backend immediately after account creation. The user must click the link in the email before being able to log in (attempting to log in without verifying returns a `403`).

### Login

```
User fills form → POST /login
                    ├── 200 OK  → token stored → redirect to /user-dashboard
                    ├── 401     → "Invalid credentials" (wrong email or password)
                    └── 403     → "Email not verified" + resend button shown
```

On success, the backend returns `{ jwt, role }`. The role is mapped immediately:

| Backend value | Frontend role |
|---|---|
| `admin` | `Administrator` |
| `scientist` | `Scientist` |
| `user` | `User` |

The mapped role is stored in `permissionsStore.currentRole` (persisted in localStorage), which drives route guards and sidebar navigation.

### Email Verification

```
User clicks link in email → GET /verify-email?token=<token>
                              ├── 200 → success message → redirect after 2s
                              └── 400 → "Invalid or expired token" shown
```

Handled by `VerifyEmailView.vue`. The token is extracted from the URL query param `?token=`.

### Resend Verification Email

Triggered from the login page when a `403` is returned:

```
User clicks "Resend verification email" → POST /resend-verification { email }
                                            ├── 200 → confirmation message, button disabled
                                            └── 4xx → error message shown, button re-enabled
```

The backend always returns `200` even for unknown emails (security: no user enumeration). A `409` is returned if the email is already verified.

### Forgot Password

```
User submits email → POST /password-reset/request { email }
                       └── 200 → "Check your inbox" message shown
```

The backend sends a reset link by email. Response is always `200` regardless of whether the email exists.

### Reset Password

```
User clicks link in email → /reset-password?token=<token>
User submits new password → POST /password-reset/confirm { token, new_password }
                              ├── 200 → "Password updated" → redirect to /login
                              └── 400 → "Invalid or expired token"
```

Password requirements validated client-side before submission:
- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number

---

## Token Management

File: `src/client/clientCommon.ts`

```ts
storeToken(jwt)           // Saves JWT in cookie (key: 'token')
getToken()                // Reads JWT from cookie
getAuthenticatedHeader()  // Returns { Authorization: 'Bearer <token>' }
deleteToken()             // Removes cookie (used on logout)
```

All protected API calls must include the authenticated header:

```ts
axios.get('/user', { headers: getAuthenticatedHeader() })
```

---

## Session Persistence

`permissionsStore.currentRole` is persisted to localStorage via `pinia-plugin-persistedstate`. This means the user stays "logged in" across page refreshes without re-fetching the token.

On any `401` response from the API, the Axios interceptor automatically redirects to `/login`:

```ts
// src/axiosConfiguration.ts
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) router.push('/login')
    return Promise.reject(error)
  }
)
```

---

## Route Protection

Routes declare their requirements in `meta`:

```ts
{
  path: '/user-dashboard',
  meta: {
    requiresAuth: true,
    roles: ['Administrator', 'Scientist', 'User']
  }
}
```

The `beforeEach` guard in `src/router/index.ts` enforces this:

1. No role in store → redirect to `/login`
2. Role not in allowed list → redirect to `/user-dashboard`
3. Otherwise → proceed

---

## Files Reference

| File | Responsibility |
|---|---|
| `src/client/clientAuth.ts` | All auth API calls |
| `src/client/clientCommon.ts` | Token storage helpers |
| `src/stores/userStore.ts` | Runtime session state |
| `src/stores/permissionsStore.ts` | Role, permissions, persisted auth |
| `src/axiosConfiguration.ts` | Base URL + 401 interceptor |
| `src/router/index.ts` | Route guards |
| `src/views/LoginView.vue` | Login + resend email UI |
| `src/views/RegisterView.vue` | Registration form |
| `src/views/VerifyEmailView.vue` | Email verification handler |
| `src/views/ForgotPasswordView.vue` | Password reset request |
| `src/views/ResetPasswordView.vue` | Password reset form |
