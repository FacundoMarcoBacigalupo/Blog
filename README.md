# IT Noticias — Blog de tecnología

Blog de noticias y tutoriales del mundo IT (IA, hardware, seguridad, internet, desarrollo). Frontend en React + Vite, datos en Firebase (Firestore + Storage + Auth). Desarrollado por Statim Software.

## Arquitectura (frontend / backend / storage)

Este proyecto ahora tiene una arquitectura separada:

- **Frontend:** React + Vite, deploy en **Netlify** (deploy automático desde GitHub, rama main).
- **Backend:** Fastify + TypeScript + Prisma (SQLite/Postgres), deploy en **Render**. Se encarga de:
  - Autenticación con JWT en cookie httpOnly (secure en prod, sameSite).
  - Rate limiting: max 15 intentos por IP, bloqueo de 6 horas.
  - Endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/api/health`.
- **Storage / DB de posts:** Firebase (Firestore para posts, Firebase Storage para imágenes, Firebase Auth legacy para admin).
- **URL backend (Render):** configurar en Netlify como `VITE_BACKEND_URL`.

El frontend habla con el backend para auth y con Firebase para posts/imágenes.

## Estructura

```
Blog/
├── public/                 Assets estáticos (logo, favicon)
├── src/
│   ├── Assets/img/         Imágenes (logo, notFound, rrss)
│   ├── Components/
│   │   ├── Blog/           Blog (listado), BlogsPost (card), CreatePost (admin), List, ViewPosts/Post
│   │   ├── Footer/         Footer tech (sin Contacto ni MercadoPago)
│   │   ├── Navbar/         Navbar responsive (desktop + mobile drawer)
│   │   ├── Loading/
│   │   ├── ButtonUp/
│   │   └── ViewProfile/
│   ├── Context/            AuthProvider (Firebase Auth)
│   ├── data/posts.js       20 posts estáticos (10 de 2025, 10 de 2026)
│   ├── firebase.js         Config Firebase (Firestore, Auth, Storage)
│   ├── Routers/            Router
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Deploy en producción

- **Frontend:** Netlify (deploy automático desde GitHub, rama main).
- **Base de datos:** Firebase Firestore (proyecto Firebase del owner).
- **Storage:** Firebase Storage (imágenes de posts).
- **Auth:** Firebase Authentication (admin para crear posts).
- **URL prod:** la configurada en Netlify (dominio propio o `*.netlify.app`).

## Variables de entorno (Netlify)

Configurar en Netlify → Site settings → Environment variables (prefijo VITE_):
- `VITE_API_KEY`
- `VITE_AUTH_DOMAIN`
- `VITE_PROJECT_ID`
- `VITE_STORAGE_BUCKET`
- `VITE_MESSAGING_SENDER_ID`
- `VITE_APP_ID`
- `VITE_MEASURE_REMENT_ID`
- `VITE_API_CREATE_POST` (TinyMCE API key)
- `VITE_BACKEND_URL` (URL del backend en Render, ej. `https://blog-backend.onrender.com`)

## Variables de entorno (Render — backend)

- `DATABASE_URL` (Postgres de Render o `file:./dev.db` para SQLite local)
- `JWT_SECRET` (string largo aleatorio)
- `FRONTEND_URL` (URL de Netlify, ej. `https://itnoticias.netlify.app`)
- `ADMIN_EMAIL` (email del admin)
- `ADMIN_PASSWORD` (password del admin)
- `NODE_ENV=production`
- `PORT` (Render lo setea automáticamente)

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # genera dist/
```

## Cambios recientes

- Navbar rediseñado (desktop + mobile drawer) con estilo tech.
- Footer tech, sin sección de Contacto ni CVU de MercadoPago. Incluye Stack y categorías.
- Imágenes con fallback a placeholder (picsum/loremflickr) si fallan.
- 20 posts estáticos de tecnología (10 de 2025, 10 de 2026) en `src/data/posts.js`, mezclados con los de Firestore.
- Títulos y metadata actualizados (sin MythF).
- README con estructura y deploy info.