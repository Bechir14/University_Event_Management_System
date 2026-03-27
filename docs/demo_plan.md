# Demo Plan — University Event Management System

**Demo Date:** Week 3 Submission
**Duration:** ~10 minutes
**Presenter:** Bechir Ebnou (Lead) + Team
**Environment:** Local (Docker Compose)

---

## Pre-Demo Checklist

- [ ] `docker-compose up --build` completes without errors
- [ ] Backend API accessible at http://localhost:8000/api/
- [ ] Frontend accessible at http://localhost:3000
- [ ] Django admin accessible at http://localhost:8000/admin/
- [ ] GitHub repo open in browser tab
- [ ] Jira sprint board open in browser tab
- [ ] GitHub Actions tab open (showing green CI run)
- [ ] Postman / browser DevTools ready for API calls (optional)

---

## Demo Script

### Part 1 — GitHub Repository (2 min)

1. Open **https://github.com/Bechir14/University_Event_Management_System**
2. Show the **README** — point out:
   - CI badge (green)
   - Sprint board link (Jira)
   - Tech stack badges
   - Quick start instructions
3. Walk through **folder structure**: `backend/`, `frontend/`, `docs/`, `infra/`
4. Show **`docs/`** folder: risk register, demo plan, DB schema
5. Click **Actions tab** → show the latest CI run passing all 3 jobs:
   - Backend Tests (8 tests passing)
   - Frontend Lint
   - Docker Build

---

### Part 2 — Jira Sprint Board (1 min)

1. Open **https://mebnou14.atlassian.net/jira/software/projects/KAN/boards/1**
2. Show the active sprint with tasks organized in columns (To Do / In Progress / Done)
3. Point out tasks completed this sprint (backend MVP, Docker, CI/CD)

---

### Part 3 — Working System Demo (6 min)

> System should already be running via `docker-compose up`

#### 3a. Student Flow

1. Open **http://localhost:3000**
2. Click **Register** → fill in form as a student:
   - Username: `student_demo`
   - Password: `demo1234`
   - Role: Student
3. Log in with the new credentials → show JWT token stored in browser
4. Browse the **Events List** page — show filters (category, status, search)
5. Click on a published event → view **Event Detail** page
6. Click **Register for Event** → show success notification
7. Go to **My Registrations** → confirm the registration appears

#### 3b. Organizer Flow

1. Log out, then log in as an organizer (pre-created: `organizer_demo` / `demo1234`)
2. Go to **Create Event** page → fill in:
   - Title: `Spring Workshop`
   - Category: Workshop
   - Date: future date
   - Capacity: 30
   - Status: Published
3. Submit → show event appears in the event list

#### 3c. Admin Panel (Django Admin)

1. Open **http://localhost:8000/admin/**
2. Log in as superuser (pre-created via `createsuperuser`)
3. Show the registered models: Users, Events, Registrations, Notifications, Feedback
4. Show the student registration created in step 3a

---

### Part 4 — API Endpoints (1 min, optional)

Open browser or Postman and demonstrate one raw API call:

```
POST http://localhost:8000/api/auth/login/
Body: { "username": "student_demo", "password": "demo1234" }
Response: { "access": "...", "refresh": "...", "role": "student" }
```

---

## Fallback Plan

| Issue | Fallback |
|-------|----------|
| Docker fails to start | Run backend with `python manage.py runserver` directly |
| Frontend doesn't load | Show the Django REST API browser UI at http://localhost:8000/api/ |
| CI badge not green | Show the test run locally: `python manage.py test apps` |
| Jira board inaccessible | Screenshot in `/docs/` folder as backup |

---

## Key Talking Points

- **Architecture**: Clean separation of concerns — React SPA + Django REST API
- **Security**: JWT authentication, role-based permissions on every endpoint
- **Scalability**: Docker containerization; PostgreSQL-ready (SQLite for MVP)
- **Process**: Agile with Jira sprint tracking + GitHub Actions for automated quality gates
- **Testing**: 8 automated tests covering auth, event creation, and permission enforcement
