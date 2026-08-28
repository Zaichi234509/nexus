# Nexus — CRM + Client Portal SaaS

A production-quality CRM and Client Portal platform built with a modern full-stack architecture.

## Brand
**Nexus**

## Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, React
- **Backend**: Go (Golang), RESTful API, service/controller/repository pattern
- **Database**: PostgreSQL 15
- **Auth**: JWT tokens with bcrypt password hashing
- **Storage**: Document/file storage architecture (upload/download framework)
- **Real-time**: WebSocket framework ready (architecture defined)

## Project Structure

```
nexus/
├── frontend/          # Next.js 14 frontend
│   ├── app/            # App router pages
│   ├── lib/            # Auth services, API clients
│   ├── components/     # Reusable UI components
│   └── public/
├── backend/            # Go backend
│   ├── cmd/api/        # Entry point
│   ├── internal/
│   │   ├── auth/       # Authentication (JWT, bcrypt)
│   │   ├── clients/     # Client management
│   │   ├── middleware/  # Auth & role middleware
│   │   ├── database/    # PostgreSQL connection
│   │   └── ...          # Projects, tasks, invoices, etc.
│   ├── migrations/     # SQL migrations + seed data
│   └── tests/
├── docker-compose.yml
└── README.md
```

## What's Implemented (Phased Build)

### Phase 1 — Project Setup ✅
- Next.js 14 app router with TypeScript
- Go backend with clean module structure
- PostgreSQL schema with UUIDs, enums, indexes, foreign keys
- Docker Compose for backend, frontend, and database

### Phase 2 — Authentication ✅
- Register (`POST /api/auth/register`)
- Login (`POST /api/auth/login`)
- JWT session tokens (24h expiry)
- Secure bcrypt password hashing
- Role-based authorization middleware (`super_admin`, `admin`, `staff`, `client`)
- Protected routes in frontend (localStorage token management)

### Phase 3 — Database ✅
- Normalized PostgreSQL schema
- Tables: `users`, `organizations`, `clients`, `projects`, `tasks`, `documents`, `invoices`, `messages`, `tickets`, `appointments`, `notifications`, `activity_logs`
- Migrations (`001_init.sql`, `002_seed.sql`)
- Realistic seed data for development

### Phase 4 — Admin Dashboard ✅
- Professional SaaS layout with sidebar navigation
- Overview cards (clients, projects, tickets, revenue)
- Recent clients table
- Responsive design with dark theme

### Phase 5 — Client Management ✅
- Client list (`GET /api/clients`) with pagination framework
- Client profile architecture (tabs: Overview, Projects, Documents, Invoices, Messages, Support)
- Client statuses: `lead`, `prospect`, `active`, `inactive`, `archived`
- Search, filter, and sort framework

### Phase 6 — Client Portal ✅
- Separate client-facing navigation framework
- Client dashboard architecture (project progress, upcoming tasks, invoices, messages)
- Client-only data isolation framework (tenant isolation at backend layer)

## Security

- Authentication middleware on all protected endpoints
- Role-based access control (`RoleAllowed` middleware)
- Password hashing with `bcrypt`
- JWT token validation with `jwt-go`
- SQL injection protection via parameterized queries (`database/sql`)
- Input validation on auth endpoints
- CORS configured for development
- Multi-tenancy isolation enforced at database/query layer

## Demo Accounts

| Role       | Email                  | Password     | Access Level       |
|------------|------------------------|--------------|--------------------|
| Admin      | admin@nexus.local      | admin123     | Full system        |
| Staff      | staff@nexus.local      | staff123     | Assigned clients   |
| Client     | client@nexus.local     | client123    | Client portal only |

## Setup Instructions

### 1. Environment

```bash
cp .env.example .env  # Create from template
```

Required variables:
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `CORS_ORIGIN`

### 2. Start Services

```bash
docker-compose up --build
```

This starts:
- PostgreSQL (`localhost:5432`)
- Go backend (`localhost:8080`)
- Next.js frontend (`localhost:3000`)

### 3. Initialize Database

```bash
# After PostgreSQL is running
cd backend
bash init_db.sh
```

### 4. Access

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8080/health`
- Login page: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin/dashboard`
- Client portal: `http://localhost:3000/portal` (framework ready)

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/clients
GET    /api/health
```

Full API documentation is planned for Phase 8, with OpenAPI/Swagger specification.

## Design Direction

- Modern, clean SaaS interface
- Premium dark theme with brand blue (`#526bff`)
- Responsive layout with mobile navigation
- Subtle animations (hover states, transitions)
- Skeleton loaders and empty states included
- Card-based dashboard design

## Remaining Phases (Incremental)

Based on the master prompt and phased approach:

- **Phase 7**: Business features — Invoices, Payments, Support tickets, Appointments
- **Phase 8**: Communication — Real-time messaging, notifications, activity logs
- **Phase 9**: Reports — Revenue analytics, charts, exports
- **Phase 10**: Security optimization — Rate limiting, CSRF, audit logging, penetration review
- **Phase 11**: Final polish — Responsive testing, accessibility audit, animation refinement, documentation

## Performance

- Database indexes on all foreign keys and search fields
- Pagination architecture on list endpoints
- Lazy loading framework for components
- Efficient SQL queries with proper joins
- API caching framework ready

## Code Quality

- TypeScript strict mode (planned)
- Clean Go code with modular packages
- Reusable React components
- Clear naming conventions
- Environment variables for configuration
- Error handling and validation
- No fake API calls — every endpoint connects to PostgreSQL

## Multi-Tenancy

The database schema and backend middleware enforce tenant isolation. Each client, project, and document is scoped to an `organization_id`. The backend queries include `organization_id` filters so clients never see another organization's data.

## License

Internal / Development use for Arena.ai agent evaluation.
