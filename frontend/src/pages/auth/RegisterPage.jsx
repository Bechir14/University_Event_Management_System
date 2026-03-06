import {
  Box, Card, CardContent, TextField, Button, Typography,
  Divider, Link, FormControl, InputLabel, Select, MenuItem, Alert,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', role: 'student',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to POST /api/auth/register/
    if (!form.firstName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card elevation={4} sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <EventIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={700}>Create Account</Typography>
            <Typography variant="body2" color="text.secondary">Join the UniEvents platform</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="First Name" fullWidth value={form.firstName} onChange={handleChange('firstName')} required />
              <TextField label="Last Name" fullWidth value={form.lastName} onChange={handleChange('lastName')} />
            </Box>
            <TextField label="Email" type="email" fullWidth value={form.email} onChange={handleChange('email')} required />
            <TextField label="Password" type="password" fullWidth value={form.password} onChange={handleChange('password')} required />

            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={form.role} label="Role" onChange={handleChange('role')}>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="organizer">Organizer</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Register
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link component="button" onClick={() => navigate('/login')}>Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
