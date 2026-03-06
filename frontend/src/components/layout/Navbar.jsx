import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Menu, MenuItem, Avatar, Box, Badge, Tooltip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

// Mock: replace with real auth context later
const mockUser = { name: 'Lemin', role: 'student', avatar: 'L' };

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <EventIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
          onClick={() => navigate('/events')}
        >
          UniEvents
        </Typography>

        <Button color="inherit" onClick={() => navigate('/events')}>Events</Button>

        {mockUser.role === 'student' && (
          <Button color="inherit" onClick={() => navigate('/my-registrations')}>My Registrations</Button>
        )}
        {mockUser.role === 'organizer' && (
          <Button color="inherit" onClick={() => navigate('/organizer/events')}>My Events</Button>
        )}
        {mockUser.role === 'admin' && (
          <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
        )}

        <Box sx={{ mx: 1 }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={() => navigate('/notifications')}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>

        <Tooltip title="Account">
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 34, height: 34, fontSize: 15 }}>
              {mockUser.avatar}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem disabled>
            <Typography variant="caption" color="text.secondary">
              Signed in as {mockUser.name} ({mockUser.role})
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>Profile</MenuItem>
          <MenuItem onClick={() => { navigate('/login'); handleMenuClose(); }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
