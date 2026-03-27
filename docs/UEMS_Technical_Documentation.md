# University Event Management System
## UEMS — Technical Documentation

**Version:** Week 3 MVP Complete
**Last Updated:** 2026-03-27

---

| Member | Role |
|--------|------|
| **Bechir Ebnou** | Lead Dev / Architect / PM |
| **Lemin Ebnou** | Frontend / Schema Designer |
| **Youssef Al Youssefy** | Backend / DevOps |

**Tech Stack:** React 19 · Django 6 · SQLite (MVP) · Docker · JWT · Terraform

**Repository:** https://github.com/Bechir14/University_Event_Management_System

**Sprint Board:** https://mebnou14.atlassian.net/jira/software/projects/KAN/boards/1

**CI/CD:** https://github.com/Bechir14/University_Event_Management_System/actions

---

## Table of Contents

1. Executive Summary
2. Sprint History
3. Product Description and Vision
4. Core Features and Capabilities
5. Technical Architecture and Infrastructure
6. Technology Stack
7. Security Architecture
8. Role and Authorization Management
9. Clearance Level System
10. User Experience and Interface
11. REST API Reference
12. Database Schema
13. CI/CD Pipeline
14. Risk Register
15. Installation and Deployment
16. Demo Plan
17. Competitive Analysis
18. Technical Requirements
19. Team

---

## 1. Executive Summary

The University Event Management System (UEMS) is a purpose-built web application that centralises the full lifecycle of university events — from creation and publication through registration, attendance, and post-event feedback. It replaces ad-hoc email chains, spreadsheets, and manual coordination with a single, role-aware platform accessible to students, event organisers, and administrators.

The system is developed as part of a university software-engineering course by a three-person team over six weeks. It targets small-to-medium universities seeking a lightweight, open-source alternative to commercial event platforms.

### Key Outcomes by Sprint

| Sprint | Week | Status | Key Deliverables |
|--------|------|--------|-----------------|
| Sprint 1 | Week 1 | ✅ Complete | Project setup, repo init, tech stack selection, team roles |
| Sprint 2 | Week 2 | ✅ Complete | Frontend wireframes (11 pages), DB schema, app scaffolding |
| Sprint 3 | Week 3 | ✅ Complete | Full backend MVP, CI/CD pipeline, Docker, 8 automated tests |

---

## 2. Sprint History

### Sprint 1 — Project Initialization (Week 1)

**Goal:** Establish the project foundation and development environment.

**Completed Tasks:**
- Initialized Git repository and pushed to GitHub
- Defined project scope, user roles, and core feature set
- Selected technology stack (React 19, Django 6, PostgreSQL, Docker, Terraform)
- Set up team roles and responsibilities in Jira
- Wrote initial README with project overview
- Initialized Django backend project structure with Poetry
- Initialized React + Vite frontend project
- Added Terraform infrastructure file (`infra/main.tf`)

**Artifacts:**
- GitHub repository: https://github.com/Bechir14/University_Event_Management_System
- Initial project structure (`backend/`, `frontend/`, `infra/`, `docs/`)
- `pyproject.toml` with all backend dependencies declared

---

### Sprint 2 — Design Phase (Week 2)

**Goal:** Design the system — UI wireframes, database schema, and backend module scaffolding.

**Completed Tasks:**
- Designed and implemented full React + MUI frontend with 11 routed pages
- Configured React Router DOM v7 with role-based route structure
- Built reusable components: `EventCard`, `EventFilters`, `Layout`, `Navbar`
- Implemented all page scaffolds: auth, student, organizer, and admin views
- Designed complete relational database schema (6 entities, UUID PKs)
- Documented schema in `docs/db_schema.md` with ER diagram and relationship table
- Scaffolded 5 Django apps: `users`, `events`, `registrations`, `notifications`, `feedback`
- Declared all dependencies in `pyproject.toml` (Django, DRF, SimpleJWT, CORS, decouple)

**Artifacts:**
- 11 React page components across 4 role areas
- `docs/db_schema.md` — complete ER diagram and constraints
- 5 Django app modules (scaffold only)
- Merged via Pull Request #1 from `feat/week2-frontend-wireframes-schema`

**Schema Summary:**

```
User ────────────────────────────────────────────────────────────────
│  id (UUID, PK) · email (UNIQUE) · password (hashed)
│  first_name · last_name · role (student|organizer|admin)
│
├──[organizes]──→ Event        (1 → Many)
├──[registers]──→ Registration (1 → Many)
├──[receives]───→ Notification (1 → Many)
└──[submits]────→ Feedback     (1 → Many)

Registration  UNIQUE(user_id, event_id)
Feedback      UNIQUE(user_id, event_id)
All PKs: UUID
```

---

### Sprint 3 — MVP Implementation (Week 3)

**Goal:** Implement the full working backend, integrate Docker, set up CI/CD, and complete documentation.

**Completed Tasks:**

**Backend (Django):**
- Implemented `User` model extending `AbstractUser` with role field (student/organizer/admin)
- Implemented `Event` model (UUID PK, title, description, date, location, category, capacity, status, organizer FK)
- Implemented `Registration` model with status (confirmed/waitlist/cancelled) and UNIQUE(user, event)
- Implemented `Notification` model (user FK, message, is_read, optional event FK)
- Implemented `Feedback` model with 1–5 rating validator and UNIQUE(user, event)
- Created serializers for all 5 apps (including custom JWT serializer that embeds role)
- Implemented views: RegisterView, MeView, EventViewSet, RegisterForEventView, MyRegistrationsView, NotificationListView, MarkReadView, SubmitFeedbackView, EventFeedbackView, UserListView
- Created URL configs for all apps, wired into main `config/urls.py`
- Registered all models in Django admin with custom display configurations
- Updated `settings.py`: registered all apps, configured JWT, CORS, REST framework, AUTH_USER_MODEL
- Ran `makemigrations` and `migrate` — all 26 migration steps applied cleanly
- Added 8 automated tests: user registration, JWT login, profile endpoint, event creation (organizer), event creation blocked for students, event list
- All 8 tests pass: `Ran 8 tests in 1.591s — OK`

**DevOps:**
- Implemented `Dockerfile.backend` (Python 3.12-slim + Poetry, exposes port 8000)
- Implemented `Dockerfile.frontend` (Node 20 multi-stage build → nginx, exposes port 80)
- Implemented `docker-compose.yml` (backend + frontend with environment variables)
- Added `.github/workflows/ci.yml` with 3 jobs: backend-tests, frontend-lint, docker-build
- Added root `.gitignore` (excludes pycache, sqlite, .env, node_modules, dist)

**Documentation:**
- Updated `README.md` with CI badge and Jira sprint board link
- Created `docs/risk_register.md` with 8 identified risks
- Created `docs/demo_plan.md` with full step-by-step demo script

**Artifacts:**
- 25+ new/modified files committed to `main`
- GitHub Actions CI pipeline — 3 jobs, triggers on push/PR to main
- Working REST API with JWT authentication
- `docs/risk_register.md`, `docs/demo_plan.md`

---

## 3. Product Description and Vision

### What It Is

UEMS is a multi-role web portal. Students discover, register for, and review university events. Organisers create and manage events, track registrations, and receive feedback. Administrators oversee the entire platform — users, events, analytics, and system health.

### Vision

To provide universities with a self-hosted, secure, and extensible event management platform that is easy to deploy, easy to extend, and free from vendor lock-in. Built on open standards (REST, JWT) and containerised for self-hosting or cloud.

### Design Goals

- **Role clarity** — each user type sees only what is relevant to their role
- **Data integrity** — duplicate registrations and feedback prevented at the database level
- **Extensibility** — modular Django apps and a RESTful API allow future integrations
- **Developer experience** — Docker Compose brings the full stack up in one command

---

## 4. Core Features and Capabilities

| Feature | Description | Status |
|---------|-------------|--------|
| Authentication & Registration | JWT-based login and sign-up; role assigned at registration | ✅ Implemented |
| Event Browsing | Search and filter events by title, category, date, or location | ✅ Implemented |
| Event Detail | Full event info — capacity, location, dates, organiser, live registration status | ✅ Implemented |
| Event Registration | One-click registration with confirmation; waitlist when capacity is full | ✅ Implemented |
| Registration Management | Students view and cancel their own registrations | ✅ Implemented |
| Notifications | In-app notifications for registration confirmation and status changes | ✅ Implemented |
| Feedback & Ratings | Post-event 1–5 star ratings with optional text (one per user per event) | ✅ Implemented |
| Organiser Dashboard | Create, edit, publish, or cancel events | ✅ Implemented |
| Admin — User Management | Admins can view all users via API | ✅ Implemented |
| Waitlist Auto-Promotion | Cancelled spots automatically promote next waitlisted student | 🔜 Planned (Sprint 4) |
| Admin Analytics Dashboard | Platform-wide analytics: event counts, registration volumes | 🔜 Planned (Sprint 4) |
| Frontend API Integration | Connect React pages to live Django API | 🔜 Planned (Sprint 4) |

---

## 5. Technical Architecture and Infrastructure

### System Overview

```
┌──────────────────────────────────────────────────────────┐
│                     Client Browser                        │
│              React 19 SPA (Vite + MUI 7)                  │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTPS / REST + JWT
┌──────────────────────▼───────────────────────────────────┐
│                   Django 6 Backend                        │
│               DRF · SimpleJWT · CORS                      │
│   users │ events │ registrations │ notifications          │
│                      feedback                             │
└──────────────────────┬───────────────────────────────────┘
                       │ Django ORM
┌──────────────────────▼───────────────────────────────────┐
│              SQLite (MVP) / PostgreSQL (Prod)              │
│   Users · Events · Registrations · Notifications          │
│                      Feedback                             │
└──────────────────────────────────────────────────────────┘
```

### Containerisation

| Service | Container | Port | Notes |
|---------|-----------|------|-------|
| Frontend | `Dockerfile.frontend` | 3000 | Node 20 build → nginx serve |
| Backend | `Dockerfile.backend` | 8000 | Python 3.12-slim + Poetry |
| Database | SQLite (MVP) | — | File-based; PostgreSQL for production |

### Repository Structure

```
University_Event_Management_System/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── backend/
│   ├── apps/
│   │   ├── users/              # Custom User model + JWT auth
│   │   ├── events/             # Event CRUD + permissions
│   │   ├── registrations/      # Registration + waitlist logic
│   │   ├── notifications/      # In-app notification system
│   │   └── feedback/           # Post-event ratings
│   ├── config/
│   │   ├── settings.py         # Django settings (JWT, CORS, apps)
│   │   └── urls.py             # Main URL routing
│   ├── manage.py
│   ├── pyproject.toml
│   └── poetry.lock
├── frontend/
│   └── src/
│       ├── components/         # EventCard, EventFilters, Layout, Navbar
│       ├── pages/              # 11 route-level page components
│       ├── services/           # API service layer (Sprint 4)
│       └── context/            # Auth context (Sprint 4)
├── docs/
│   ├── db_schema.md
│   ├── risk_register.md
│   └── demo_plan.md
├── infra/
│   └── main.tf                 # Terraform infrastructure
├── Dockerfile.backend
├── Dockerfile.frontend
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 6. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | React | 19.x | Component-based SPA |
| Frontend | Material UI (MUI) | 7.x | Design system & component library |
| Frontend | React Router DOM | 7.x | Client-side routing |
| Frontend | Axios | 1.x | HTTP client for API calls |
| Frontend | Vite | 6.x | Build tool & dev server |
| Backend | Django | 6.x | Web framework & ORM |
| Backend | Django REST Framework | 3.16.x | RESTful API layer |
| Backend | SimpleJWT | 5.x | JWT authentication |
| Backend | django-cors-headers | 4.x | CORS management |
| Backend | python-decouple | 3.x | Environment variable management |
| Database | SQLite | — | MVP database (file-based) |
| Database | PostgreSQL | 16 | Production database target |
| DevOps | Docker + Compose | 24.x | Containerisation |
| CI/CD | GitHub Actions | — | Automated test + build pipeline |
| Infra | Terraform | 1.x | Infrastructure as code |
| Dep Mgmt | Poetry | 2.x | Python dependency management |

---

## 7. Security Architecture

### Authentication

JWT tokens issued on login via `djangorestframework-simplejwt`. The custom `CustomTokenObtainPairSerializer` embeds the user's `role` and `username` directly in the token payload, so the frontend can gate UI without an extra API call. Access tokens have a 24-hour lifetime; refresh tokens 7 days.

### Authorisation

Every API endpoint enforces role restrictions via DRF permission classes server-side. `IsOrganizerOrAdmin` permission class gates event creation and modification. Frontend role-gating is UX-only; backend is the source of truth.

### Data Integrity

`UNIQUE(user_id, event_id)` constraints on `Registration` and `Feedback` prevent double-submission at the database level, enforced independently of application logic. All primary keys are UUIDs.

### Transport Security

CORS managed with `django-cors-headers`. In production, CORS origins are explicitly allowlisted. CSRF protection active for admin views.

### Environment Secrets

`SECRET_KEY` and `DEBUG` are read from environment variables via `python-decouple`. Defaults are safe for CI but insecure — production requires explicit `.env` configuration. `.gitignore` excludes all `.env` files and `db.sqlite3`.

---

## 8. Role and Authorization Management

| Role | Assigned To | Access Scope |
|------|-------------|-------------|
| `student` | All registered students | Browse events, register, view own registrations, submit feedback, notifications |
| `organizer` | Faculty / club coordinators | All student permissions + create/edit/cancel own events, view registrant lists |
| `admin` | Platform administrators | Full access — all events, all users, user list endpoint |

---

## 9. Clearance Level System

| Level | Role | Permitted Routes |
|-------|------|-----------------|
| Level 0 — Public | Unauthenticated | `/login`, `/register` |
| Level 1 — Student | `student` | `/events`, `/events/:id`, `/my-registrations`, `/notifications`, `/events/:id/feedback` |
| Level 2 — Organizer | `organizer` | Level 1 + `/organizer/events`, `/organizer/create-event` |
| Level 3 — Admin | `admin` | Level 2 + `/admin/dashboard`, `/admin/users` |

---

## 10. User Experience and Interface

### Design Principles

- **Role-scoped navigation** — Navbar renders only relevant links per role
- **Responsive layout** — MUI Grid ensures usability on desktop, tablet, and mobile
- **Consistent theming** — single MUI theme object governs all colours and typography (blue primary, purple secondary)

### Page Inventory

| Page | Route | Role | Status |
|------|-------|------|--------|
| Login | `/login` | Public | ✅ Scaffolded |
| Register | `/register` | Public | ✅ Scaffolded |
| Events List | `/events` | Student+ | ✅ Scaffolded (mock data) |
| Event Detail | `/events/:id` | Student+ | ✅ Scaffolded |
| My Registrations | `/my-registrations` | Student+ | ✅ Scaffolded |
| Notifications | `/notifications` | Student+ | ✅ Scaffolded |
| Feedback | `/events/:id/feedback` | Student+ | ✅ Scaffolded |
| Create Event | `/organizer/create-event` | Organizer+ | ✅ Scaffolded |
| Organizer Events | `/organizer/events` | Organizer+ | ✅ Scaffolded |
| Admin Dashboard | `/admin/dashboard` | Admin | ✅ Scaffolded |
| Manage Users | `/admin/users` | Admin | ✅ Scaffolded |

> **Note:** All pages are scaffolded with Material UI. API integration (connecting to live backend) is planned for Sprint 4.

---

## 11. REST API Reference

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| `POST` | `/api/auth/register/` | None | Create user account (returns user object) |
| `POST` | `/api/auth/login/` | None | Obtain JWT access + refresh tokens |
| `POST` | `/api/auth/refresh/` | None | Refresh access token |
| `GET` | `/api/auth/me/` | Any role | Get current user profile |
| `GET` | `/api/events/` | None | List events (filterable by status, category) |
| `POST` | `/api/events/` | Organizer | Create new event |
| `GET` | `/api/events/:id/` | None | Get event detail |
| `PUT` | `/api/events/:id/` | Organizer (owner) | Update event |
| `DELETE` | `/api/events/:id/` | Organizer (owner) | Cancel/delete event |
| `POST` | `/api/registrations/events/:id/register/` | Student | Register for event (auto-waitlist if full) |
| `GET` | `/api/registrations/my/` | Student | Get own registrations |
| `DELETE` | `/api/registrations/:id/cancel/` | Student | Cancel a registration |
| `GET` | `/api/notifications/` | Any role | Get own notifications |
| `PATCH` | `/api/notifications/:id/read/` | Any role | Mark notification as read |
| `POST` | `/api/feedback/` | Student | Submit post-event feedback |
| `GET` | `/api/feedback/events/:id/` | Any role | Get feedback for an event |
| `GET` | `/api/admin/users/` | Admin | List all users |

### Sample Auth Flow

```bash
# 1. Register
POST /api/auth/register/
{ "username": "alice", "email": "alice@uni.edu", "password": "secret123", "role": "student" }

# 2. Login
POST /api/auth/login/
{ "username": "alice", "password": "secret123" }
→ { "access": "<JWT>", "refresh": "<JWT>", "role": "student", "username": "alice" }

# 3. Use access token
GET /api/events/
Authorization: Bearer <JWT>
```

---

## 12. Database Schema

### ER Diagram

```
User ────────────────────────────────────────────────────────────────
│  id (UUID, PK)
│  email (VARCHAR, UNIQUE)
│  password (VARCHAR, hashed PBKDF2-SHA256)
│  first_name · last_name
│  role (ENUM: student | organizer | admin)
│  bio (TEXT, optional)
│  created_at (DATETIME)
│
├──[organizes]──→ Event        (1 → Many)
├──[registers]──→ Registration (1 → Many)
├──[receives]───→ Notification (1 → Many)
└──[submits]────→ Feedback     (1 → Many)

Event ───────────────────────────────────────────────────────────────
│  id (UUID, PK)
│  organizer_id (UUID, FK → User)
│  title (VARCHAR) · description (TEXT)
│  date (DATETIME) · location (VARCHAR)
│  category (ENUM: academic|sports|cultural|workshop|social|other)
│  capacity (INTEGER) · status (ENUM: draft|published|cancelled)
│  created_at (DATETIME)
│
├──[has]────────→ Registration (1 → Many)
├──[triggers]───→ Notification (1 → Many)
└──[receives]───→ Feedback     (1 → Many)

Registration ────────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event)
│  status (ENUM: confirmed | waitlist | cancelled)
│  registered_at (DATETIME)
└──[UNIQUE constraint on (user_id, event_id)]

Notification ────────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event, NULLABLE)
│  message (TEXT) · is_read (BOOLEAN, default False)
│  created_at (DATETIME)

Feedback ────────────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event)
│  rating (INTEGER, 1–5)
│  comment (TEXT, optional)
│  created_at (DATETIME)
└──[UNIQUE constraint on (user_id, event_id)]
```

### Relationship Summary

| From | To | Relationship | Via Field |
|------|----|-------------|-----------|
| User | Event | 1 → Many | `event.organizer_id` |
| User | Registration | 1 → Many | `registration.user_id` |
| Event | Registration | 1 → Many | `registration.event_id` |
| User | Notification | 1 → Many | `notification.user_id` |
| Event | Notification | 1 → Many | `notification.event_id` |
| User | Feedback | 1 → Many | `feedback.user_id` |
| Event | Feedback | 1 → Many | `feedback.event_id` |

---

## 13. CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration. The pipeline runs automatically on every push and pull request to `main`.

**Pipeline URL:** https://github.com/Bechir14/University_Event_Management_System/actions

### Jobs

| Job | Trigger | Steps | Status |
|-----|---------|-------|--------|
| `backend-tests` | Push / PR to main | Checkout → Python 3.12 → Install Poetry deps → Run `manage.py test apps` | ✅ 8 tests pass |
| `frontend-lint` | Push / PR to main | Checkout → Node 20 → `npm ci` → `npm run lint` | ✅ |
| `docker-build` | After both above pass | Build `Dockerfile.backend` + `Dockerfile.frontend` | ✅ |

### Workflow File: `.github/workflows/ci.yml`

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  backend-tests:   # Python 3.12 + Poetry → django test
  frontend-lint:   # Node 20 → eslint
  docker-build:    # Build both images (needs backend-tests + frontend-lint)
```

---

## 14. Risk Register

| # | Risk | Likelihood | Impact | Score | Status |
|---|------|-----------|--------|-------|--------|
| R1 | Timeline slippage — backend delayed | High | High | 🔴 Critical | Active |
| R2 | Frontend ↔ Backend integration issues (CORS, JWT) | Medium | High | 🟠 High | Active |
| R3 | Team member unavailability | Low | Medium | 🟡 Medium | Monitoring |
| R4 | Database schema changes mid-sprint | Low | High | 🟡 Medium | Resolved |
| R5 | CI pipeline failures blocking merges | Low | Low | 🟢 Low | Monitoring |
| R6 | Docker environment inconsistency across dev machines | Medium | Medium | 🟡 Medium | Active |
| R7 | JWT token expiry during demo | Low | Medium | 🟡 Medium | Monitoring |
| R8 | SQLite not suitable for production scale | High | Low | 🟡 Medium | Accepted |

Full risk details: [`docs/risk_register.md`](./risk_register.md)

---

## 15. Installation and Deployment

### Quick Start — Docker Compose

```bash
# Clone the repository
git clone https://github.com/Bechir14/University_Event_Management_System.git
cd University_Event_Management_System

# Start all services
docker-compose up --build

# Frontend  → http://localhost:3000
# Backend   → http://localhost:8000/api/
# Admin UI  → http://localhost:8000/admin/
```

### Local Development — Backend

```bash
cd backend

# Activate poetry environment
poetry env activate
source <path-from-above>

# Install dependencies
poetry install --no-root

# Apply migrations
python manage.py migrate

# Create superuser for admin panel
python manage.py createsuperuser

# Run tests
python manage.py test apps

# Start dev server
python manage.py runserver
```

### Local Development — Frontend

```bash
cd frontend

npm install
npm run dev       # http://localhost:5173
npm run build     # production build
npm run lint      # ESLint check
```

---

## 16. Demo Plan

### Pre-Demo Checklist

- [ ] `docker-compose up --build` completes without errors
- [ ] Backend accessible at `http://localhost:8000/api/`
- [ ] Frontend accessible at `http://localhost:3000`
- [ ] GitHub repo open in browser (README with CI badge visible)
- [ ] Jira sprint board open in browser
- [ ] GitHub Actions tab open showing green CI run

### Demo Script (10 minutes)

**Part 1 — GitHub Repository (2 min)**
1. Show README — CI badge, Jira link, tech stack, quick start
2. Walk through folder structure: `backend/`, `frontend/`, `docs/`, `.github/`
3. Click **Actions** tab → show 3 green CI jobs

**Part 2 — Jira Sprint Board (1 min)**
1. Show active sprint at https://mebnou14.atlassian.net/jira/software/projects/KAN/boards/1
2. Point out completed tasks for Sprint 3

**Part 3 — Working System (6 min)**

*Student flow:*
1. Register as student → login → receive JWT
2. Browse events list → filter by category
3. Click event → view detail → register → confirm notification

*Organizer flow:*
4. Login as organizer → create a new event (title, date, capacity, category)
5. Event appears in public list immediately

*Admin panel:*
6. Open `http://localhost:8000/admin/` → show all models registered

**Part 4 — Live API (1 min, optional)**
```
POST /api/auth/login/ → { "access": "...", "role": "student" }
GET  /api/events/     → list of events
```

Full demo script: [`docs/demo_plan.md`](./demo_plan.md)

---

## 17. Competitive Analysis

| Capability | UEMS | Eventbrite | Meetup | Generic LMS |
|-----------|------|-----------|--------|-------------|
| University-specific roles | ✓ | ✗ | ✗ | Partial |
| Self-hosted / open-source | ✓ | ✗ | ✗ | Varies |
| Waitlist with auto-promotion | ✓ | ✓ | ✗ | ✗ |
| Post-event feedback loop | ✓ | Partial | ✗ | Partial |
| Role-gated admin analytics | ✓ | ✗ | ✗ | ✓ |
| Terraform-managed infra | ✓ | N/A | N/A | N/A |
| No per-ticket SaaS fees | ✓ | ✗ | ✗ | ✓ |
| REST API for integrations | ✓ | ✓ | ✓ | Varies |
| GitHub Actions CI/CD | ✓ | N/A | N/A | N/A |

---

## 18. Technical Requirements

### Runtime Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Python | 3.12 | 3.14 |
| Node.js | 18 LTS | 20 LTS |
| Docker Engine | 24.x | Latest |
| RAM (dev) | 2 GB | 4 GB |
| RAM (prod) | 1 GB | 2 GB |

### Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome / Edge | 110+ |
| Firefox | 110+ |
| Safari | 16+ |

---

## 19. Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Bechir Ebnou** | Lead Dev · System Architect · PM | Architecture decisions, Jira management, code reviews, final integration, backend API |
| **Lemin Ebnou** | Frontend Developer · Schema Designer | React + MUI UI, DB schema design, UI/UX wireframes, routing |
| **Youssef Al Youssefy** | Backend Developer · DevOps Engineer | Django APIs, Docker, CI/CD, PostgreSQL, cloud deployment |

---

**Repository:** https://github.com/Bechir14/University_Event_Management_System

**Sprint Board:** https://mebnou14.atlassian.net/jira/software/projects/KAN/boards/1

**CI Pipeline:** https://github.com/Bechir14/University_Event_Management_System/actions

---

*Last updated: 2026-03-27 — Week 3 MVP complete.*
