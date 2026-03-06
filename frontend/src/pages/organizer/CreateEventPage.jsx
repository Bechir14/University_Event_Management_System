import {
  Box, Typography, Paper, TextField, Button, Grid,
  FormControl, InputLabel, Select, MenuItem, Breadcrumbs, Link,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const CATEGORIES = ['Seminar', 'Workshop', 'Career Fair', 'Student Activity', 'Conference'];

const defaultForm = {
  title: '', category: '', description: '', location: '',
  startDate: '', startTime: '', endDate: '', endTime: '', capacity: '',
};

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (action) => {
    // TODO: POST /api/events/ with status = action ('draft' | 'published')
    console.log('Submitting event as:', action, form);
    navigate('/organizer/events');
  };

  return (
    <Layout>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component="button" underline="hover" color="inherit" onClick={() => navigate('/organizer/events')}>
          My Events
        </Link>
        <Typography color="text.primary">Create Event</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={700} gutterBottom>Create New Event</Typography>

      <Paper elevation={2} sx={{ p: 4, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Title"
              fullWidth
              required
              value={form.title}
              onChange={handleChange('title')}
              placeholder="e.g. Spring Career Fair 2026"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select value={form.category} label="Category" onChange={handleChange('category')}>
                {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Capacity"
              type="number"
              fullWidth
              required
              value={form.capacity}
              onChange={handleChange('capacity')}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Describe the event..."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              fullWidth
              required
              value={form.location}
              onChange={handleChange('location')}
              placeholder="e.g. Building A, Room 101"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={form.startDate}
              onChange={handleChange('startDate')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={form.startTime}
              onChange={handleChange('startTime')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.endDate}
              onChange={handleChange('endDate')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.endTime}
              onChange={handleChange('endTime')}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => navigate('/organizer/events')}>Cancel</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleSubmit('draft')}>Save as Draft</Button>
              <Button variant="contained" onClick={() => handleSubmit('published')}>Publish Event</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
}
