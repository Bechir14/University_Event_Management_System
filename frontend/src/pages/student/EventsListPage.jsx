import { useState } from 'react';
import {
  Grid, Typography, Box, Pagination, Chip,
} from '@mui/material';
import Layout from '../../components/layout/Layout';
import EventCard from '../../components/events/EventCard';
import EventFilters from '../../components/events/EventFilters';

// Mock data — replace with API call: GET /api/events/
const MOCK_EVENTS = [
  { id: 1, title: 'AI & Machine Learning Workshop', category: 'Workshop', location: 'Building A, Room 101', startDate: '2026-03-10', capacity: 50, spotsLeft: 12, status: 'published' },
  { id: 2, title: 'Spring Career Fair 2026', category: 'Career Fair', location: 'Main Hall', startDate: '2026-03-15', capacity: 300, spotsLeft: 145, status: 'published' },
  { id: 3, title: 'Research Methods Seminar', category: 'Seminar', location: 'Auditorium', startDate: '2026-03-18', capacity: 100, spotsLeft: 60, status: 'published' },
  { id: 4, title: 'Student Club Expo', category: 'Student Activity', location: 'Campus Grounds', startDate: '2026-03-22', capacity: 200, spotsLeft: 0, status: 'published' },
  { id: 5, title: 'Web Development Bootcamp', category: 'Workshop', location: 'Lab 3', startDate: '2026-03-25', capacity: 30, spotsLeft: 5, status: 'published' },
  { id: 6, title: 'International Students Conference', category: 'Conference', location: 'Conference Center', startDate: '2026-04-01', capacity: 150, spotsLeft: 90, status: 'published' },
];

export default function EventsListPage() {
  const [filters, setFilters] = useState({ search: '', category: 'All', status: 'All', dateFrom: '' });
  const [page, setPage] = useState(1);

  const filtered = MOCK_EVENTS.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchCat = filters.category === 'All' || e.category === filters.category;
    const matchStatus = filters.status === 'All' || e.status === filters.status.toLowerCase();
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Browse Events</Typography>
        <Typography color="text.secondary">Discover and register for upcoming university events</Typography>
      </Box>

      <EventFilters filters={filters} onChange={setFilters} />

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {filtered.length} events found
        </Typography>
        {filters.category !== 'All' && (
          <Chip label={filters.category} size="small" onDelete={() => setFilters({ ...filters, category: 'All' })} />
        )}
      </Box>

      <Grid container spacing={3}>
        {filtered.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">No events match your search.</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={3} page={page} onChange={(_, v) => setPage(v)} color="primary" />
      </Box>
    </Layout>
  );
}
