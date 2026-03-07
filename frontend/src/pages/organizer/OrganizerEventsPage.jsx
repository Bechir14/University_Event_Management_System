import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// Mock data — replace with GET /api/events/?organizer=me
const MOCK_EVENTS = [
  { id: 1, title: 'AI & ML Workshop', category: 'Workshop', date: '2026-03-10', capacity: 50, registered: 38, status: 'published' },
  { id: 2, title: 'Research Seminar Q1', category: 'Seminar', date: '2026-03-20', capacity: 100, registered: 45, status: 'published' },
  { id: 3, title: 'Tech Talk: Cloud Computing', category: 'Seminar', date: '2026-04-05', capacity: 80, registered: 0, status: 'draft' },
];

const statusColors = { published: 'success', draft: 'default', cancelled: 'error' };

export default function OrganizerEventsPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>My Events</Typography>
          <Typography color="text.secondary">Manage your created events</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/organizer/create-event')}
        >
          Create Event
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Event Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Registrations</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_EVENTS.map((event) => (
              <TableRow key={event.id} hover>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.registered} / {event.capacity}</TableCell>
                <TableCell>
                  <Chip label={event.status} size="small" color={statusColors[event.status]} />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Registrations">
                    <IconButton size="small" onClick={() => navigate(`/organizer/events/${event.id}/registrations`)}>
                      <PeopleIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Event">
                    <IconButton size="small" onClick={() => navigate(`/organizer/events/${event.id}/edit`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel Event">
                    <IconButton size="small" color="error" onClick={() => {/* TODO: PATCH /api/events/:id/ status=cancelled */}}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
