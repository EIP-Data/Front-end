# White-label Guide

This frontend is designed to be deployed under any brand without modifying the source code. All customization goes through environment variables and asset replacement.

---

## What Can Be Customized

| Element | Variable / File | Description |
|---|---|---|
| App name | `VITE_APP_NAME` | Displayed in navbar, titles, headings |
| Browser tab title | `VITE_APP_TITLE` | HTML `<title>` tag |
| Primary color | `VITE_PRIMARY_COLOR` | Buttons, links, accents (hex) |
| API endpoint | `VITE_API_URL` | Backend base URL |
| Logo | `src/assets/images/logo.*` | Replace the file |
| Favicon | `public/favicon.ico` | Replace the file |

---

## How It Works

### 1. Environment Variables → Store

On startup (`main.ts`), the `brandStore` reads the Vite env vars and applies colors:

```ts
// src/stores/brandStore.ts
const appName = import.meta.env.VITE_APP_NAME ?? 'App'
const primaryColor = import.meta.env.VITE_PRIMARY_COLOR ?? '#F9AB3B'
```

### 2. CSS Variable Injection

`brandStore.applyBrandColor()` is called once at mount. It sets CSS custom properties on `:root`:

```ts
document.documentElement.style.setProperty('--color-brand', primaryColor)
document.documentElement.style.setProperty('--color-brand-dark', darkerShade)
document.documentElement.style.setProperty('--primary-color', primaryColor)
```

Components consume these via Tailwind utility classes or directly in CSS:

```html
<!-- Via CSS variable -->
<div style="color: var(--color-brand)">...</div>
```

### 3. App Name in HTML

The `html-brand-inject` Vite plugin replaces the `<title>` at build time:

```ts
// vite.config.ts
{
  name: 'html-brand-inject',
  transformIndexHtml(html) {
    return html.replace(/__APP_TITLE__/g, env.VITE_APP_TITLE ?? 'App')
  }
}
```

### 4. App Name in Components

Accessible via the store in any component:

```ts
import { useBrandStore } from '@/stores/brandStore'
const brand = useBrandStore()
// brand.appName     → 'Datalyz'
// brand.primaryColor → '#F9AB3B'
```

---

## Deploying a New Brand

1. Create a `.env` file from `.env.example`:

```env
VITE_API_URL=https://api.my-brand.com
VITE_APP_NAME=MyBrand
VITE_APP_TITLE=MyBrand
VITE_PRIMARY_COLOR=#3B82F6
```

2. Replace visual assets:
   - `src/assets/images/logo.*` → brand logo
   - `public/favicon.ico` → brand favicon

3. Build the application:

```bash
npm run build
```

The `dist/` folder contains the compiled app with the brand baked in.

---

## Primary Color

The color defined in `VITE_PRIMARY_COLOR` is applied to:

- Primary buttons (submit, CTAs)
- Links and accented text
- Input focus borders
- Sidebar highlights

A darker variant (`--color-brand-dark`) is computed automatically (–10% lightness) for hover states.

---

## Dark Mode

Dark mode is managed independently from branding via `settingsStore`. It toggles the `.dark` class on `<html>` and respects the OS preference on first load. The preference is persisted in `localStorage`.

```ts
import { useSettingsStore } from '@/stores/settingsStore'
const settings = useSettingsStore()
settings.toggleDarkMode()
```
