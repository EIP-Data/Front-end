# Deployment

## Environments

| Environment | Description |
|---|---|
| Development | Local Vite dev server with HMR |
| Production | Static files served by nginx inside Docker |

---

## Environment Variables

Each environment needs its own `.env` file. Never commit `.env` files — only `.env.example` is tracked.

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Backend API base URL |
| `VITE_APP_NAME` | Yes | App name shown in UI |
| `VITE_APP_TITLE` | Yes | Browser tab title |
| `VITE_PRIMARY_COLOR` | No | Primary brand hex color (default: `#F9AB3B`) |

All `VITE_*` variables are inlined at build time by Vite. Changing them requires a rebuild.

---

## Development

```bash
cp .env.example .env
# Fill in VITE_API_URL with your local backend address

npm install
npm run dev
# → http://localhost:5173
```

The dev server proxies nothing by default. Make sure the backend is running and `VITE_API_URL` points to it.

---

## Production Build

```bash
npm run build
```

Output is in `dist/`. This folder contains static files ready to be served by any HTTP server.

The build step runs `vue-tsc` (type checking) before Vite. Fix any TypeScript errors before deploying.

---

## Docker

### Build and run

```bash
docker compose up --build
```

### What the container does

1. **Build stage** — installs dependencies and runs `npm run build` inside a Node image
2. **Serve stage** — copies `dist/` into an nginx image and serves it on port 80

### Passing environment variables

Vite bakes env vars into the bundle at build time, so they must be available **during the Docker build**, not at runtime.

Pass them as build args in `docker-compose.yml`:

```yaml
services:
  frontend:
    build:
      context: .
      args:
        VITE_API_URL: https://api.my-domain.com
        VITE_APP_NAME: MyApp
        VITE_APP_TITLE: MyApp
        VITE_PRIMARY_COLOR: "#F9AB3B"
```

And reference them in the `Dockerfile`:

```dockerfile
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_TITLE
ARG VITE_PRIMARY_COLOR
ENV VITE_API_URL=$VITE_API_URL
# … repeat for each var
RUN npm run build
```

---

## nginx

The app uses client-side routing (Vue Router history mode). nginx must redirect all requests to `index.html`, otherwise direct URL access (e.g. `/login`) returns a 404.

Required nginx config:

```nginx
server {
    listen 80;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Checklist Before Deploying

- [ ] `.env` is configured with production values
- [ ] `VITE_API_URL` points to the production backend
- [ ] `npm run build` completes without errors
- [ ] nginx `try_files` fallback is configured
- [ ] CORS is enabled on the backend for the frontend domain
- [ ] HTTPS is configured (the cookie storing the JWT should be `Secure`)
