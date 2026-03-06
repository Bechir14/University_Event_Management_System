import {
  Box, Card, CardContent, TextField, Button, Typography,
  Divider, Link, Alert,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to POST /api/auth/login/
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    navigate('/events');
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
      <Card elevation={4} sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <EventIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" fontWeight={700}>UniEvents</Typography>
            <Typography variant="body2" color="text.secondary">Sign in to your account</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange('email')}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link component="button" onClick={() => navigate('/register')}>
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
