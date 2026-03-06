import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  TextField, InputAdornment, Tooltip, Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';

// Mock data — replace with GET /api/admin/users/
const MOCK_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@university.edu', role: 'student', joined: '2026-01-15', active: true },
  { id: 2, name: 'Bob Smith', email: 'bob@university.edu', role: 'organizer', joined: '2026-01-10', active: true },
  { id: 3, name: 'Carol Davis', email: 'carol@university.edu', role: 'student', joined: '2026-02-01', active: false },
  { id: 4, name: 'Dr. Lee', email: 'lee@university.edu', role: 'organizer', joined: '2026-01-05', active: true },
  { id: 5, name: 'Admin User', email: 'admin@university.edu', role: 'admin', joined: '2026-01-01', active: true },
];

const roleColors = { student: 'primary', organizer: 'secondary', admin: 'error' };

export default function ManageUsersPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase())
      || u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>Manage Users</Typography>
          <Typography color="text.secondary">{MOCK_USERS.length} registered users</Typography>
        </Box>
      </Box>

      <TextField
        placeholder="Search users..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
        }}
        sx={{ mb: 3, width: 280 }}
      />

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Joined</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} size="small" color={roleColors[user.role]} />
                </TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell>
                  <Chip
                    label={user.active ? 'Active' : 'Suspended'}
                    size="small"
                    color={user.active ? 'success' : 'error'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit Role">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={user.active ? 'Suspend User' : 'Activate User'}>
                    <IconButton size="small" color={user.active ? 'error' : 'success'}>
                      <BlockIcon fontSize="small" />
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
