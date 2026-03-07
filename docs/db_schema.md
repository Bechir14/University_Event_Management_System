# Database Schema — University Event Management System

**Author:** Lemin Ebnou (Frontend Developer / Schema Designer)
**Week:** 2 — Design Phase
**Stack:** PostgreSQL via Django ORM

---

## ER Diagram (Text Format)

```
User ──────────────────────────────────────────────────────────────
│  id (UUID, PK)
│  email (VARCHAR, UNIQUE)
│  password (VARCHAR, hashed)
│  first_name (VARCHAR)
│  last_name (VARCHAR)
│  role (ENUM: student | organizer | admin)
│  created_at (DATETIME)
│
├──[organizes]──→ Event (1 User → Many Events)
├──[registers]──→ Registration (1 User → Many Registrations)
├──[receives]───→ Notification (1 User → Many Notifications)
└──[submits]────→ Feedback (1 User → Many Feedbacks)

Category ─────────────────────────────────────────────────────────
│  id (UUID, PK)
│  name (VARCHAR, UNIQUE)
│  description (TEXT)
│
└──[contains]───→ Event (1 Category → Many Events)

Event ─────────────────────────────────────────────────────────────
│  id (UUID, PK)
│  organizer_id (UUID, FK → User)
│  category_id (UUID, FK → Category)
│  title (VARCHAR)
│  description (TEXT)
│  location (VARCHAR)
│  start_date (DATETIME)
│  end_date (DATETIME)
│  capacity (INTEGER)
│  status (ENUM: draft | published | cancelled)
│  created_at (DATETIME)
│
├──[has]────────→ Registration (1 Event → Many Registrations)
├──[triggers]───→ Notification (1 Event → Many Notifications)
└──[receives]───→ Feedback (1 Event → Many Feedbacks)

Registration ──────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event)
│  registered_at (DATETIME)
│  status (ENUM: confirmed | cancelled | waitlist)
│
└──[UNIQUE constraint on (user_id, event_id)]

Notification ──────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event, NULLABLE)
│  message (TEXT)
│  is_read (BOOLEAN, default False)
│  sent_at (DATETIME)

Feedback ──────────────────────────────────────────────────────────
│  id (UUID, PK)
│  user_id (UUID, FK → User)
│  event_id (UUID, FK → Event)
│  rating (INTEGER, 1–5)
│  comment (TEXT, NULLABLE)
│  submitted_at (DATETIME)
│
└──[UNIQUE constraint on (user_id, event_id)]
```

---

## Relationships Summary

| From         | To           | Relationship | Via Field         |
|-------------|-------------|--------------|-------------------|
| User         | Event        | 1 → Many     | event.organizer_id |
| Category     | Event        | 1 → Many     | event.category_id  |
| User         | Registration | 1 → Many     | registration.user_id |
| Event        | Registration | 1 → Many     | registration.event_id |
| User         | Notification | 1 → Many     | notification.user_id |
| Event        | Notification | 1 → Many     | notification.event_id |
| User         | Feedback     | 1 → Many     | feedback.user_id   |
| Event        | Feedback     | 1 → Many     | feedback.event_id  |

---

## Notes

- All PKs use UUID for security and distributed-system readiness.
- `Registration` and `Feedback` have a composite UNIQUE constraint on `(user_id, event_id)` to prevent duplicate entries.
- When `event.status = cancelled`, all `confirmed` registrations should trigger a `Notification` (handled in backend business logic).
- Waitlist logic: when a `confirmed` registration is cancelled, the next `waitlist` registration is promoted to `confirmed` and a notification is sent.
- `Notification.event_id` is nullable to support system-level notifications not tied to a specific event.
