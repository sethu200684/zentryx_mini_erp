# Zentryx Mini-ERP — Task & Analytics Management System

A full-stack task management application with authentication, CRUD task operations, and a real-time analytics dashboard. Built as a technical assessment for the Full-Stack Developer Intern position at Zentryx Innovation.

## Tech Stack

**Frontend:** Next.js 14 (TypeScript) + Tailwind CSS
- Chosen for its App Router, built-in routing, and strong TypeScript support. Tailwind allows fast, consistent, responsive UI development without leaving the component file.

**Backend:** Node.js + Express (TypeScript)
- Express provides a lightweight, well-documented framework for building a REST API. TypeScript adds type safety across request/response handling and shared types with the frontend.

**Database:** PostgreSQL + Prisma ORM
- Chosen over a NoSQL option because the data is inherently relational (users own many tasks, a clear one-to-many relationship benefits from foreign keys and referential integrity). Prisma provides type-safe queries, migrations, and a clear schema-as-code approach.

**Auth:** JWT (JSON Web Tokens)
- Stateless authentication that works cleanly across a decoupled frontend/backend. Tokens are stored in `localStorage` on the client and attached via an Axios interceptor on every request.

**Charts:** Recharts
- A lightweight React charting library used for the task status donut chart and priority bar chart on the dashboard.

## Project Structure

```
zentryx-mini-erp/
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/   # Route logic (auth, tasks, analytics)
│   │   ├── routes/        # Express route definitions
│   │   ├── middleware/    # JWT auth middleware
│   │   ├── lib/            # Prisma client, JWT helpers
│   │   └── server.ts       # App entry point
│   └── prisma/
│       └── schema.prisma   # Database schema
├── frontend/          # Next.js + TypeScript client
│   └── src/
│       ├── app/
│       │   ├── login/
│       │   ├── register/
│       │   └── (app)/       # Protected route group
│       │       ├── dashboard/
│       │       └── tasks/
│       ├── components/       # Reusable UI components
│       ├── context/           # Auth context (global state)
│       ├── lib/                # API client + endpoint functions
│       └── types/               # Shared TypeScript types
└── README.md

```

## Database Schema

Two tables with a one-to-many relationship (one user has many tasks):

```
┌─────────────────┐         ┌──────────────────────────┐
│      User       │         │        Task              │
├─────────────────┤         ├──────────────────────────┤
│ id (PK, uuid)   │───┐     │ id (PK, uuid)            │
│ name            │   │     │ title                    │
│ email (unique)  │   │     │ description (nullable)   │
│ password(hashed)│   └────>│ userId (FK → User.id)    │
│ createdAt       │         │ dueDate                  │
└─────────────────┘         │ priority(LOW/MEDIUM/HIGH)│
                            │ status (TODO/IN_PROGRESS/|
                            │    COMPLETED)            |
                            │ createdAt                |
                            │ updatedAt                |
                            └──────────────────────────┘

```

- `Task.userId` is a foreign key referencing `User.id`, with `onDelete: Cascade` — deleting a user also removes their tasks.
- Every task-related query is scoped by `userId`, and ownership is re-verified server-side before any update/delete, preventing users from accessing or modifying tasks that aren't theirs.

Full schema is in `backend/prisma/schema.prisma`.

## Setup Instructions

### Prerequisites
- Node.js 18+
- A PostgreSQL database (this project was built and tested using [Neon](https://neon.tech), a free serverless Postgres provider)

### 1. Clone the repository

```bash
git clone https://github.com/sethu200684/zentryx_mini_erp.git
cd zentryx_mini_erp
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see `.env.example` for reference):
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
JWT_SECRET="your-jwt-secret-here"
JWT_REFRESH_SECRET="your-refresh-secret-here"
PORT=5000

Run the database migration:

```bash
npx prisma migrate dev --name init
```

Start the backend server:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/` (see `.env.example` for reference): NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`.

### 4. Using the app

1. Visit `http://localhost:3000`
2. Register a new account
3. You'll be redirected to the dashboard
4. Create tasks from the "Tasks" page, and view your analytics on "Dashboard"

## API Endpoints

| Method | Endpoint             | Description                     | Auth Required |
|--------|-----------------------|----------------------------------|----------------|
| POST   | `/api/auth/register`   | Register a new user              | No             |
| POST   | `/api/auth/login`      | Log in and receive a JWT         | No             |
| GET    | `/api/auth/me`         | Get current logged-in user       | Yes            |
| GET    | `/api/tasks`            | Get all tasks for logged-in user | Yes            |
| POST   | `/api/tasks`            | Create a new task                | Yes            |
| PATCH  | `/api/tasks/:id`        | Update a task                     | Yes            |
| DELETE | `/api/tasks/:id`        | Delete a task                     | Yes            |
| GET    | `/api/analytics`        | Get task analytics summary        | Yes            |

## Notes / Design Decisions

- **JWT storage:** Tokens are stored in `localStorage` for simplicity within the assessment timeframe. In a production environment, an httpOnly cookie would be preferred to reduce XSS exposure.
- **"Completed Today" metric:** Since there's no dedicated `completedAt` field, this is derived from `updatedAt` on tasks marked `COMPLETED`. A separate `completedAt` timestamp could be added for more precision.
- **Overdue logic:** A task is considered overdue if its `dueDate` has passed and its status is not `COMPLETED`.

## Screenshots

### Login
![Login](./screenshots/login.png)

### Register
![Register](./screenshots/register.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Tasks
![Tasks](./screenshots/tasks.png)

### Task Form
![Task Form](./screenshots/task-form.png)

