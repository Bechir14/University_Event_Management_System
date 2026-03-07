import {
  Box, Typography, Grid, Paper, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Button, LinearProgress,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// Mock analytics — replace with GET /api/admin/analytics/
const STATS = [
  { label: 'Total Events', value: 24, icon: <EventIcon />, color: 'primary.main' },
  { label: 'Total Users', value: 342, icon: <PeopleIcon />, color: 'success.main' },
  { label: 'Registrations', value: 891, icon: <CheckCircleIcon />, color: 'warning.main' },
  { label: 'Avg. Rating', value: '4.3 / 5', icon: <StarIcon />, color: 'info.main' },
];

const RECENT_EVENTS = [
  { id: 1, title: 'AI & ML Workshop', organizer: 'Prof. Johnson', registered: 38, capacity: 50, status: 'published' },
  { id: 2, title: 'Spring Career Fair', organizer: 'Career Center', registered: 155, capacity: 300, status: 'published' },
  { id: 3, title: 'Tech Talk: Cloud', organizer: 'Dr. Lee', registered: 0, capacity: 80, status: 'draft' },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Admin Dashboard</Typography>
        <Typography color="text.secondary">System overview and management</Typography>
      </Box>

      {/* Stats cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {STATS.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    <Typography variant="h4" fontWeight={700}>{stat.value}</Typography>
                  </Box>
                  <Box sx={{ color: stat.color, opacity: 0.8 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => navigate('/admin/users')}>Manage Users</Button>
        <Button variant="outlined" onClick={() => navigate('/admin/categories')}>Manage Categories</Button>
        <Button variant="outlined" onClick={() => navigate('/admin/events')}>All Events</Button>
      </Box>

      {/* Recent events table */}
      <Typography variant="h6" fontWeight={600} gutterBottom>Recent Events</Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Event</strong></TableCell>
              <TableCell><strong>Organizer</strong></TableCell>
              <TableCell><strong>Registrations</strong></TableCell>
              <TableCell><strong>Fill Rate</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RECENT_EVENTS.map((event) => {
              const fillRate = Math.round((event.registered / event.capacity) * 100);
              return (
                <TableRow key={event.id} hover>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>{event.registered} / {event.capacity}</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={fillRate}
                        sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        color={fillRate > 80 ? 'error' : 'primary'}
                      />
                      <Typography variant="caption">{fillRate}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={event.status}
                      size="small"
                      color={event.status === 'published' ? 'success' : 'default'}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
