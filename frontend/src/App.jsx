import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import EventsListPage from './pages/student/EventsListPage';
import EventDetailPage from './pages/student/EventDetailPage';
import MyRegistrationsPage from './pages/student/MyRegistrationsPage';
import NotificationsPage from './pages/student/NotificationsPage';
import CreateEventPage from './pages/organizer/CreateEventPage';
import OrganizerEventsPage from './pages/organizer/OrganizerEventsPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import FeedbackPage from './pages/FeedbackPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#6a1b9a' },
    background: { default: '#f5f6fa' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student */}
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/events/:id/feedback" element={<FeedbackPage />} />

          {/* Organizer */}
          <Route path="/organizer/events" element={<OrganizerEventsPage />} />
          <Route path="/organizer/create-event" element={<CreateEventPage />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<ManageUsersPage />} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
