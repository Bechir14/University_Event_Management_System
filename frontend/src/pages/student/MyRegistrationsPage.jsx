import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Button, Tabs, Tab,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

// Mock data — replace with GET /api/registrations/?user=me
const MOCK_REGISTRATIONS = [
  { id: 1, eventTitle: 'AI & Machine Learning Workshop', date: '2026-03-10', status: 'confirmed', canCancel: true },
  { id: 2, eventTitle: 'Spring Career Fair 2026', date: '2026-03-15', status: 'confirmed', canCancel: true },
  { id: 3, eventTitle: 'Student Club Expo', date: '2026-03-22', status: 'waitlist', canCancel: true },
  { id: 4, eventTitle: 'Web Development Bootcamp', date: '2026-02-10', status: 'cancelled', canCancel: false },
];

const statusColors = { confirmed: 'success', waitlist: 'warning', cancelled: 'error' };

export default function MyRegistrationsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  const tabs = ['All', 'Confirmed', 'Waitlist', 'Cancelled'];
  const filtered = tab === 0
    ? MOCK_REGISTRATIONS
    : MOCK_REGISTRATIONS.filter((r) => r.status === tabs[tab].toLowerCase());

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>My Registrations</Typography>
        <Typography color="text.secondary">Manage your event registrations</Typography>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {tabs.map((t) => <Tab key={t} label={t} />)}
      </Tabs>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Event</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((reg) => (
              <TableRow key={reg.id} hover>
                <TableCell>{reg.eventTitle}</TableCell>
                <TableCell>{reg.date}</TableCell>
                <TableCell>
                  <Chip label={reg.status} size="small" color={statusColors[reg.status]} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => navigate(`/events/${reg.id}`)}
                  >
                    View Event
                  </Button>
                  {reg.canCancel && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {/* TODO: DELETE /api/registrations/:id/ */}}
                      sx={{ ml: 1 }}
                    >
                      Cancel
                    </Button>
                  )}
                  {reg.status === 'cancelled' && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => navigate(`/events/${reg.id}`)}
                      sx={{ ml: 1 }}
                    >
                      Give Feedback
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
