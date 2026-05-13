# Contributing

## Branches

```
main / master   → production
feat/<name>     → new feature
fix/<name>      → bug fix
chore/<name>    → tooling, deps, config
```

---

## Adding a New Page

### 1. Create the view

Add `src/views/MyFeatureView.vue`. Use an existing layout as the wrapper:

```vue
<script setup lang="ts">
import LayoutShowcase from '@/components/common/LayoutShowcase.vue'
// or LayoutDashboard for authenticated pages
</script>

<template>
  <LayoutShowcase>
    <!-- page content -->
  </LayoutShowcase>
</template>
```

| Layout | Use for |
|---|---|
| `LayoutShowcase` | Public pages (no auth required) |
| `LayoutDashboard` | Authenticated pages (includes sidebar + topbar) |

### 2. Register the route

Add an entry to the `routes` array in `src/router/index.ts`:

```ts
{
  path: '/my-feature',
  name: 'MyFeature',
  component: () => import('../views/MyFeatureView.vue'),
  meta: {
    title: 'My Feature'
    // Add these for protected routes:
    // requiresAuth: true,
    // roles: ['Administrator', 'Scientist', 'User']
  }
}
```

> The catch-all `/:pathMatch(.*)*` route (404) must always remain **last** in the array.

### 3. Add translations

Add the page's translation keys to both locale files:

```json
// src/assets/locales/en.json
"myFeature": {
  "title": "My Feature",
  "description": "..."
}
```

```json
// src/assets/locales/fr.json
"myFeature": {
  "title": "Ma fonctionnalité",
  "description": "..."
}
```

---

## Adding a New Component

Create the file under the appropriate subfolder in `src/components/`:

```
src/components/
├── common/        # Shared across the whole app (navbar, footer, layouts…)
├── home/          # Homepage-specific sections
├── dashboard/     # Dashboard charts and cards
├── aboutUs/
├── getInvolved/
└── ourWork/
```

Use `<script setup lang="ts">` and define props with `defineProps`:

```vue
<script setup lang="ts">
defineProps<{
  title: string
  count?: number
}>()
</script>
```

---

## Adding a New API Call

Add the function to the relevant client file in `src/client/`:

| File | Use for |
|---|---|
| `clientAuth.ts` | Login, register, password, email verification |
| `clientAdmin.ts` | Admin-only endpoints |

Pattern to follow:

```ts
async function myCall(payload: MyRequest): Promise<MyResponse> {
  return axios
    .post('/my-endpoint', payload)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) throw new Error('myCall failed')
      return response.data as MyResponse
    })
    .catch((error: Error) => {
      console.error('myCall failed', error)
      throw error
    })
}

export { myCall }
```

For authenticated endpoints, include the auth header:

```ts
axios.get('/protected', { headers: getAuthenticatedHeader() })
```

---

## Adding a Pinia Store

Create `src/stores/myStore.ts`:

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('my', () => {
  const value = ref('')

  function setValue(v: string) {
    value.value = v
  }

  return { value, setValue }
}, {
  persist: true // remove if localStorage persistence is not needed
})
```

---

## Adding a Translation Key

1. Add the key to `src/assets/locales/en.json`
2. Add the translation to `src/assets/locales/fr.json`
3. Both files must always stay in sync — a missing key falls back to English but will log a warning

Use in a component:

```ts
// Script
const { t } = useI18n()
t('myFeature.title')

// Template
{{ $t('myFeature.title') }}
```

---

## Common Pitfalls

**Pinia before Router** — Never register `app.use(router)` before `app.use(pinia)`. The router's `beforeEach` guard calls `usePermissionsStore()` on startup, which requires an active Pinia instance.

**Catch-all route position** — The `/:pathMatch(.*)*` route (404) must be the last entry in the `routes` array. Vue Router matches routes in order.

**i18n key in both files** — Adding a key to only one locale file will not cause a build error but will produce runtime warnings and broken UI for the other language.

**Protected route meta** — A route with `requiresAuth: true` but no `roles` array allows any authenticated user. Add `roles` to restrict to specific roles.
