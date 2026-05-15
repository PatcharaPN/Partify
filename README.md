# 🎯 Partify — Part-Time Job Platform

Partify is a full-stack web application for discovering and applying to part-time jobs, featuring role-based access for candidates, employers, and admins.

---

## ✨ Features

### 👤 Candidate
- Register & Login with multi-step form (role → credentials → profile)
- Upload profile avatar via Cloudinary
- Manage profile, resume, work experience, and skills
- Browse and search part-time jobs
- Apply for jobs and track application status

### 🏢 Employer
- Create and manage job postings
- View and manage applicants
- Update application status (Accepted / Rejected / Interview)
- Manage company profile

### 🛠️ Admin
- Manage users
- Approve employers
- Moderate job listings

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Language |
| Tailwind CSS | Styling |
| Redux Toolkit | State Management |
| React Hook Form + Zod | Form Validation |
| Framer Motion | Animations |
| Iconify (Solar icons) | Icons |

### Backend
| Technology | Purpose |
|---|---|
| NestJS | Framework |
| PostgreSQL (Supabase) | Database |
| Prisma | ORM |
| JWT + bcrypt | Authentication |
| Cloudinary | Image Upload |

---

## 📁 Project Structure

```
Partify/
├── frontend/               # Next.js application
│   └── src/
│       ├── app/
│       │   ├── components/ # Reusable UI components
│       │   ├── store/      # Redux slices (auth, profile, etc.)
│       │   ├── hooks/      # Custom hooks
│       │   ├── schemas/    # Zod validation schemas
│       │   ├── types/      # TypeScript types
│       │   └── helpers/    # Utility functions
│       └── ...
└── backend/                # NestJS application
    ├── src/
    │   ├── auth/           # Authentication module
    │   ├── profile/        # Profile module
    │   ├── jobs/           # Jobs module
    │   ├── applications/   # Applications module
    │   └── prisma/         # Prisma service
    └── prisma/
        └── schema.prisma
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL (or Supabase account)
- Cloudinary account

### Installation

```bash
git clone https://github.com/PatcharaPN/Partify.git
cd Partify
```

#### Backend

```bash
cd backend
npm install
```

Create `.env` in `backend/`:

```env
DATABASE_URL=postgresql://postgres:<password>@<host>:5432/postgres
JWT_SECRET=your_jwt_secret
```

```bash
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🔑 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `DATABASE_URL` | backend | PostgreSQL connection string |
| `JWT_SECRET` | backend | Secret key for JWT signing |
| `NEXT_PUBLIC_API_URL` | frontend | Backend API base URL |

---

## 📝 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/auth/me` | Get current user |

### Profile
| Method | Endpoint | Description |
|---|---|---|
| GET | `/profile` | Get profile |
| POST | `/profile` | Create or update profile |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/jobs` | List all jobs |
| POST | `/jobs` | Create job (Employer) |
| PATCH | `/jobs/:id` | Update job |
| DELETE | `/jobs/:id` | Delete job |

---

## 📄 License

MIT License
