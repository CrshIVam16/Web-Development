# UniHub 🎓

A compact university community hub: frontend (Vite + React + Tailwind) and backend (Express + MongoDB + JWT). Designed for sharing notices, opportunities, materials and alumni posts across roles (student, teacher, alumni, admin).

---

## ✨ Key Features

- 🔐 Authentication (JWT)
  - Signup / Login with hashed passwords (`bcryptjs`) and JWT-protected APIs
- 📂 Content types
  - Materials (file uploads), Opportunities, Notices, Alumni Posts
- 🛡 Role-based access
  - Protected endpoints and admin review flows
- 📱 Responsive UI
  - Mobile-friendly topbar and sidebar layout

---

## 🧰 Tech Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: `jsonwebtoken`, `bcryptjs`
- Uploads: `multer` (local disk)
- Dev: `nodemon`, `morgan`, `cors`

---

## 📁 Project Structure

```
Unihub/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/        # AuthContext.jsx, ThemeContext.jsx
│   │   ├── layouts/        # AppLayout.jsx
│   │   ├── lib/            # api.js, constants, url helpers
│   │   ├── pages/          # Login, Register, Dashboards, etc.
│   │   └── routes/         # ProtectedRoute.jsx
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── scripts/            # helper scripts (createAdmin.js)
│   ├── src/
│   │   ├── config/         # db.js, env loader
│   │   ├── controllers/
│   │   ├── middleware/     # auth, allowRoles, errorHandler
│   │   ├── models/         # AlumniPost, Guidance, Material, Notice, Opportunity, User
│   │   ├── routes/         # authRoutes, materialRoutes, opportunityRoutes, etc.
│   │   └── utils/
│   ├── uploads/            # user uploaded files (ignored)
│   └── package.json
├── .gitignore              # root ignores (env, uploads, node_modules)
└── README.md
```

---

## 🔌 API Endpoints (overview)

Backend routes are defined in `server/src/routes`. Main endpoints used by the frontend include:

- Auth
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
- Materials
  - `GET /api/materials` — list/search
  - `POST /api/materials` — upload (auth)
  - `GET /api/materials/:id/download`
- Opportunities
  - `GET /api/opportunities`
  - `POST /api/opportunities` (auth)
- Alumni posts
  - `GET /api/alumni-posts`
  - `POST /api/alumni-posts` (auth)
- Notices, Guidance, Profile, Dashboard
  - See corresponding files in `server/src/routes`
- Admin
  - Admin review endpoints live under `server/src/routes/admin*`

---

## 🗃️ Database Models (summary)

- `User` — name, email (unique), passwordHash, role, timestamps
- `AlumniPost` — title, body/content, postedBy (ref User), reviewedBy, timestamps
- `Opportunity` — title, company, link/filePath, postedBy, reviewed flag
- `Material` — title, filename, uploadedBy (ref User), filePath, timestamps
- `Notice` — title, body, createdBy, timestamps
- `Guidance` — title, body, createdBy, timestamps

Refer to `server/src/models` for exact schemas.

---

## 🔒 Local Storage (frontend)

- `token` — JWT token
- `user` — logged-in user object
- `theme` — UI theme preference

---

## ⚙️ Environment

### Backend (`server/.env`) — example

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/unihub
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CORS_ORIGINS=http://localhost:5173
```

### Frontend

Create a `.env` or use Vite env vars (example):

```env
VITE_API_BASE=http://localhost:5000/api
```

---

## 🚀 Installation & Run

1) Backend

```bash
cd server
npm install
npm run dev
```

2) Frontend

```bash
cd client
npm install
npm run dev
```

Local URLs
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## ⚠️ Known Limitations

- Uploads currently stored on local disk.
- No pagination for large result sets.
- No refresh-token flow for JWT (short-lived tokens only).

---

## 🚧 Future Enhancements

- Move uploads to cloud storage
- Add pagination and server-side search improvements
- Add admin UI for reviewing posts/opportunities
- Add refresh tokens, rate limiting, and improved security headers

---
