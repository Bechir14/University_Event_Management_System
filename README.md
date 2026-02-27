<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/MUI-5.x-007FFF?style=for-the-badge&logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-24.x-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<h1 align="center">🎓 University Event Management System</h1>

<p align="center">
  A full-stack web application to plan, schedule, and manage university events — including registration, notifications, and feedback collection.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#team">Team</a> •
  <a href="#documentation">Documentation</a>
</p>

---

## 📖 About

The **University Event Management System** is a web application designed to streamline the planning, scheduling, and management of university events such as seminars, workshops, career fairs, and student activities. The platform supports three user roles — **Students**, **Organizers**, and **Administrators** — each with tailored functionality to ensure a smooth event lifecycle from creation to feedback.

---

## ✨ Features

- 🔐 **User Authentication** — Secure JWT-based registration and login with role-based access control
- 📅 **Event Management** — Create, edit, publish, and cancel events with capacity tracking
- 📝 **Registration System** — Students can register for events with confirmation, cancellation, and waitlist support
- 🔔 **Notifications** — Real-time notifications for event updates, reminders, and status changes
- ⭐ **Feedback Collection** — Post-event ratings (1-5) and comments from attendees
- 📊 **Admin Dashboard** — Analytics, user management, and system-wide event oversight
- 🏷️ **Categories** — Organize events by type (seminar, workshop, career fair, etc.)
- 🔍 **Search & Filter** — Find events by category, date, location, or keyword

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|-------|-----------|-------------|
| **Frontend** | React.js + Material UI (MUI) | Single-page application with responsive component library |
| **Backend** | Django + Django REST Framework | RESTful API with built-in auth and ORM |
| **Database** | PostgreSQL | Relational database with ACID compliance |
| **DevOps** | Docker + Docker Compose | Containerized development and deployment |
| **Project Management** | Jira | Sprint planning, task tracking, and progress reporting |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v18+) — for local frontend development
- [Python](https://www.python.org/) (3.12+) & [Poetry](https://python-poetry.org/) — for local backend development

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/university-event-management.git
cd university-event-management

# Start all services
docker-compose up --build

# The app will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api/
# Admin Panel: http://localhost:8000/admin/
```

### Manual Setup

#### Backend (Django)

```bash
cd backend

# Install dependencies
poetry install

# Run migrations
poetry run python manage.py migrate

# Create superuser
poetry run python manage.py createsuperuser

# Start server
poetry run python manage.py runserver
```

#### Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

---

## 📁 Project Structure

```
university-event-management/
│
├── backend/                    # Django backend
│   ├── config/                 # Django project settings
│   ├── apps/
│   │   ├── users/              # User auth & profiles
│   │   ├── events/             # Event CRUD & management
│   │   ├── registrations/      # Event registration logic
│   │   ├── notifications/      # Notification system
│   │   └── feedback/           # Ratings & comments
│   ├── pyproject.toml
│   ├── poetry.lock
│   └── manage.py
│
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable MUI components
│   │   ├── pages/              # Route-level pages
│   │   ├── services/           # API service layer
│   │   ├── context/            # React context providers
│   │   └── utils/              # Helper functions
│   └── package.json
│
├── docs/                       # Documentation
│   ├── Project_Overview.pdf    # Project overview & management plan
│   ├── uml_usecase_diagram.svg # Use case diagram
│   ├── uml_class_diagram.svg   # Class / ER diagram
│   └── uml_diagram.puml        # PlantUML source
│
├── docker-compose.yml          # Docker orchestration
├── Dockerfile.backend          # Backend container
├── Dockerfile.frontend         # Frontend container
└── README.md
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register/` | User registration |
| `POST` | `/api/auth/login/` | User login (JWT) |
| `GET` | `/api/events/` | List all published events |
| `POST` | `/api/events/` | Create a new event (organizer) |
| `GET` | `/api/events/:id/` | Get event details |
| `PUT` | `/api/events/:id/` | Update event (organizer) |
| `DELETE` | `/api/events/:id/` | Cancel event (organizer) |
| `POST` | `/api/events/:id/register/` | Register for an event |
| `GET` | `/api/notifications/` | Get user notifications |
| `POST` | `/api/events/:id/feedback/` | Submit event feedback |
| `GET` | `/api/admin/analytics/` | Admin analytics dashboard |

---

## 👥 Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Bechir Ebnou** | Lead Dev, System Architect, Project Manager | Architecture, Jira management, code reviews, integration |
| **Lemin Ebnou** | Frontend Developer, Schema Designer | React + MUI UI, DB schema design, UI/UX prototyping |
| **Youssef Al Youssefy** | Backend Developer, DevOps Engineer | Django APIs, Docker, CI/CD, PostgreSQL, deployment |

---

## 📄 Documentation

All project management documents are available in the [`/docs`](./docs) directory:

| Document | Description |
|----------|-------------|
| [Project Overview (PDF)](./docs/Project_Overview.pdf) | Team info, timeline, budget, risk management |
| [Use Case Diagram (SVG)](./docs/uml_usecase_diagram.svg) | System use cases for all actor roles |
| [Class Diagram (SVG)](./docs/uml_class_diagram.svg) | Entity relationships and DB schema |
| [PlantUML Source](./docs/uml_diagram.puml) | Editable UML source file |

---

## 📝 License

This project is developed as part of a university course assignment and is for educational purposes.

---

Last modified: 2023/10/27

