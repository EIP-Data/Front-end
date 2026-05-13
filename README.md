# Datalyz — Frontend

Web application for scientific data collection and visualization. Built with Vue 3, TypeScript, and Vite.

## Tech Stack

- **Framework**: Vue 3 (`<script setup>`) + TypeScript
- **Build**: Vite
- **Styles**: Tailwind CSS 4
- **State**: Pinia (with localStorage persistence)
- **Routing**: Vue Router 4
- **HTTP**: Axios
- **Charts**: ApexCharts
- **i18n**: vue-i18n (French / English)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Backend running (see `Back-end` repository)

### Installation

```bash
git clone <repo-url>
cd Front-end

npm install

cp .env.example .env
# Edit .env with your values (see Environment Variables section below)
```

### Development

```bash
npm run dev
# App available at http://localhost:5173
```

### Production Build

```bash
npm run build

# Preview the production build locally
npm run preview
```

### Docker

```bash
docker compose up --build
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name (white-label) | `Datalyz` |
| `VITE_APP_TITLE` | Browser tab title | `Datalyz` |
| `VITE_PRIMARY_COLOR` | Primary brand color (hex) | `#F9AB3B` |

---

## Project Structure

```
src/
├── main.ts                 # Entry point
├── App.vue                 # Root component
├── router/index.ts         # Routes + authentication guards
├── stores/                 # State management (Pinia)
│   ├── brandStore.ts       # Brand name & color
│   ├── settingsStore.ts    # Dark mode & language
│   ├── userStore.ts        # User session
│   └── permissionsStore.ts # Roles & permissions
├── client/                 # API calls
│   ├── clientAuth.ts       # Auth (login, register, password reset…)
│   ├── clientAdmin.ts      # Admin features
│   └── clientCommon.ts     # JWT token helpers
├── views/                  # Page-level components (one per route)
├── components/             # Reusable components
├── assets/
│   ├── locales/            # Translations (en.json, fr.json)
│   └── css/style.css       # Global CSS variables
└── types/permissions.ts    # Role TypeScript types
```

---

## User Roles

| Role | Access |
|---|---|
| `Administrator` | Dashboard, scientist management, statistics, admin panel |
| `Scientist` | Dashboard, data, statistics |
| `User` | Dashboard, own data only |

---

## Further Documentation

- [Technical Architecture](docs/ARCHITECTURE.md)
- [White-label Guide](docs/WHITE_LABEL.md)
- [Authentication](docs/AUTH.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Deployment](docs/DEPLOYMENT.md)
