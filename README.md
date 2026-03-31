# 🚀 Partify — Part-Time Job Platform

Partify is a full-stack web application designed to help users discover, apply, and manage part-time job opportunities efficiently. The platform supports multiple user roles including candidates, employers, and administrators.

---

## ✨ Features

### 👤 Candidate
- Register & Login
- Manage profile & upload resume
- Browse and search part-time jobs
- Apply for jobs
- Track application status

### 🏢 Employer
- Create and manage job postings
- View applicants
- Update application status (Accepted / Rejected / Interview)

### 🛠️ Admin
- Manage users
- Approve employers
- Moderate job listings

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | NestJS |
| Database | PostgreSQL (via Supabase) |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| Deployment | Vercel / Render |
| CI/CD | GitHub Actions |

---

## 🔐 Key Concepts

- Role-based access control (Candidate / Employer / Admin)
- RESTful API design
- Secure authentication with JWT
- Relational database modeling with Prisma
- Scalable backend architecture

---

## 📁 Project Structure

```
Partify/
├── frontend/        # React application
└── backend/         # NestJS application
    ├── src/
    │   ├── auth/    # Authentication module
    │   ├── prisma/  # Prisma service
    │   └── ...
    ├── prisma/
    │   └── schema.prisma
    └── generated/
        └── prisma/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (or Supabase account)

### Installation

```bash
# Clone the repository
git clone https://github.com/PatcharaPN/partify.git
cd partify
```

#### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://postgres:<password>@<host>:5432/postgres
JWT_SECRET=your_jwt_secret
```

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start the server
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 📝 API Endpoints (Auth)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.
