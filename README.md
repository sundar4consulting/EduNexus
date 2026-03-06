# EduNexus — AI-Powered EdTech Platform

> A modern, full-stack learning platform for engineering students, featuring gamified learning, coding labs, AI-powered paths, leaderboards, and placement tools.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.2-2D3748?style=flat&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql)

---

## Features

- **Authentication** — JWT-based auth with refresh tokens, role-based access (Student, Faculty, Admin)
- **Course Library** — 200+ courses with modules, video/text/coding lessons, enrollment tracking
- **Learning Paths** — AI-curated DAG-based roadmaps from beginner to expert
- **Coding Lab** — In-browser code editor with multi-language support and auto-grading
- **Gamification** — Karma points, XP, levels, streaks, badges, and global leaderboard
- **Events** — Hackathons, workshops, webinars with registration management
- **Jobs Board** — Internship and placement opportunities with one-click apply
- **Community Forum** — Discussion posts with upvotes, categories, and comments
- **Analytics Dashboard** — Skill radar, study time charts, quiz performance trends
- **Certificates** — Verified course completion certificates with unique codes
- **Tiered Pricing** — Free, Pro (₹299/mo), Elite (₹599/mo), Institution (custom)
- **Real-time** — Socket.IO notifications for live updates

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool |
| Tailwind CSS 3.4 | Utility-first styling |
| Framer Motion 11 | Animations |
| Zustand 5 | Global state |
| React Query 5 | Server state |
| Recharts 2 | Data visualization |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Express 4.21 | API server |
| Prisma 6.2 | ORM |
| PostgreSQL 16 | Database |
| JWT + bcrypt | Authentication |
| Socket.IO 4.8 | Real-time |
| Zod 3.24 | Validation |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Nginx | Static serving + reverse proxy |
| Redis | Caching (optional) |

---

## Project Structure

```
edunexus/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/      # Navbar, Sidebar, Footer, Layout
│   │   ├── pages/           # All page components (15 pages)
│   │   ├── services/        # API client (axios)
│   │   ├── store/           # Zustand stores
│   │   ├── App.jsx          # Router
│   │   └── main.jsx         # Entry point
│   ├── tailwind.config.js   # Custom theme
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema (25+ models)
│   │   └── seed.js          # Sample data
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── middleware/       # Auth, error handling
│   │   ├── routes/          # 11 route modules
│   │   ├── utils/           # Karma system
│   │   └── index.js         # Server entry
│   └── .env.example
│
├── docker-compose.yml       # Full stack containers
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** 14+ (or use Docker)
- **npm** or **yarn**

### 1. Clone & Install

```bash
# Install all dependencies (root, client, server)
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### 2. Database Setup

```bash
# Copy environment file
cp server/.env.example server/.env

# Edit server/.env with your PostgreSQL credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/edunexus"

# Push schema & seed data
cd server
npx prisma db push
npx prisma db seed
cd ..
```

### 3. Run Development

```bash
# From root — starts both client (3000) and server (5000)
npm run dev
```

Or run individually:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### 4. Access

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Prisma Studio**: `cd server && npx prisma studio`

---

### Docker (Full Stack)

```bash
docker-compose up -d
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@edunexus.in | password123 |
| Faculty | priya.faculty@edunexus.in | password123 |
| Student | rahul@student.in | password123 |

---

## API Endpoints

| Module | Endpoints |
|--------|-----------|
| Auth | `POST /api/auth/register, login, refresh, logout; GET /api/auth/me` |
| Users | `GET/PUT /api/users/profile; GET /api/users/dashboard` |
| Courses | `GET /api/courses; GET /api/courses/:slug; POST /api/courses/:id/enroll` |
| Learning Paths | `GET /api/learning-paths; GET /api/learning-paths/:id` |
| Quizzes | `GET /api/quizzes; POST /api/quizzes/:id/attempt` |
| Problems | `GET /api/problems; POST /api/problems/:id/submit` |
| Events | `GET /api/events; POST /api/events/:id/register` |
| Jobs | `GET /api/jobs; POST /api/jobs/:id/apply` |
| Leaderboard | `GET /api/leaderboard` |
| Forum | `GET/POST /api/forum/posts; POST /api/forum/posts/:id/comments` |
| Notifications | `GET /api/notifications; PUT /api/notifications/:id/read` |

---

## Design System

**Theme**: Dark mode with glassmorphism, neon accents, and smooth animations

| Token | Value |
|-------|-------|
| Primary | `#6c47ff` (Purple) |
| Accent | `#ff2d7a` (Pink) |
| Neon | `#00f5ff` (Cyan) |
| Surface | `#0a0a12` (Deep Dark) |
| Display Font | Space Grotesk |
| Body Font | Inter |
| Code Font | JetBrains Mono |

---

## License

MIT © EduNexus
# EduNexus
