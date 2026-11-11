# IT Noticias — Blog de tecnología

Blog de noticias y tutoriales del mundo IT (IA, hardware, seguridad, internet, desarrollo). Frontend en React + Vite, datos en Firebase (Firestore + Storage + Auth). Desarrollado por Statim Software.

## ¿Tiene backend propio?

**No.** Este proyecto no tiene backend propio. Toda la persistencia, autenticación y almacenamiento de imágenes se resuelve con **Firebase** (BaaS):

- **Base de datos:** Firebase Firestore (colección `posts`).
- **Autenticación:** Firebase Authentication (solo el admin puede crear posts).
- **Storage:** Firebase Storage (`picturesPosts/`) para las imágenes de los posts.
- **Hosting frontend:** Netlify (deploy automático desde GitHub, rama main).

No hay servidor Node/Python propio; el frontend habla directo con Firebase.

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