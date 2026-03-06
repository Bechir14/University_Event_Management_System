import {
  Box, Typography, Button, Chip, Divider, Paper,
  Grid, Avatar, Alert, Breadcrumbs, Link,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// Mock data — replace with GET /api/events/:id/
const MOCK_EVENT = {
  id: 1,
  title: 'AI & Machine Learning Workshop',
  category: 'Workshop',
  description: 'A hands-on workshop exploring the fundamentals of AI and machine learning. Participants will work through practical exercises using Python and popular ML libraries. No prior ML experience required, but basic Python knowledge is recommended.',
  location: 'Building A, Room 101',
  startDate: '2026-03-10 09:00',
  endDate: '2026-03-10 17:00',
  capacity: 50,
  spotsLeft: 12,
  status: 'published',
  organizer: 'Prof. Sarah Johnson',
};

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = MOCK_EVENT; // TODO: fetch event by id from API

  const isWaitlist = event.spotsLeft === 0;

  return (
    <Layout>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component="button" underline="hover" color="inherit" onClick={() => navigate('/events')}>
          Events
        </Link>
        <Typography color="text.primary">{event.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={event.category} color="primary" />
              <Chip label={event.status} color="success" />
            </Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>{event.title}</Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Date & Time</Typography>
                    <Typography variant="body1">{event.startDate}</Typography>
                    <Typography variant="body2" color="text.secondary">Ends: {event.endDate}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Location</Typography>
                    <Typography variant="body1">{event.location}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Capacity</Typography>
                    <Typography variant="body1">{event.spotsLeft} / {event.capacity} spots left</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Organizer</Typography>
                    <Typography variant="body1">{event.organizer}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>About this Event</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {event.description}
            </Typography>
          </Paper>
        </Grid>

        {/* Registration sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" gutterBottom>Registration</Typography>

            {isWaitlist ? (
              <Alert severity="warning" sx={{ mb: 2 }}>
                This event is full. You can join the waitlist.
              </Alert>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                {event.spotsLeft} spots remaining
              </Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {/* TODO: POST /api/registrations/ */}}
            >
              {isWaitlist ? 'Join Waitlist' : 'Register Now'}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 1 }}
              onClick={() => navigate('/events')}
            >
              Back to Events
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
