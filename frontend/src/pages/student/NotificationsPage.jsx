import {
  Box, Typography, List, ListItem, ListItemText, ListItemAvatar,
  Avatar, IconButton, Chip, Paper, Divider, Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Layout from '../../components/layout/Layout';

// Mock data — replace with GET /api/notifications/?user=me
const MOCK_NOTIFICATIONS = [
  { id: 1, message: 'Your registration for "AI & ML Workshop" is confirmed!', isRead: false, sentAt: '2026-03-05 10:00', type: 'registration' },
  { id: 2, message: 'Reminder: "Spring Career Fair" starts tomorrow at 10am.', isRead: false, sentAt: '2026-03-14 18:00', type: 'reminder' },
  { id: 3, message: 'A spot opened up in "Web Development Bootcamp" — you moved up from the waitlist.', isRead: true, sentAt: '2026-03-03 09:30', type: 'waitlist' },
  { id: 4, message: '"Student Club Expo" has been updated: new location is Campus Grounds.', isRead: true, sentAt: '2026-03-01 14:00', type: 'update' },
];

const typeIcon = { registration: <EventIcon />, reminder: <NotificationsIcon />, waitlist: <InfoIcon />, update: <InfoIcon /> };
const typeColor = { registration: 'success', reminder: 'primary', waitlist: 'warning', update: 'info' };

export default function NotificationsPage() {
  return (
    <Layout>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>Notifications</Typography>
          <Typography color="text.secondary">Stay updated on your events</Typography>
        </Box>
        <Button startIcon={<DoneAllIcon />} onClick={() => {/* TODO: PATCH /api/notifications/mark-all-read/ */}}>
          Mark all as read
        </Button>
      </Box>

      <Paper elevation={2}>
        <List disablePadding>
          {MOCK_NOTIFICATIONS.map((n, idx) => (
            <Box key={n.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ bgcolor: n.isRead ? 'transparent' : 'action.hover', px: 3, py: 2 }}
                secondaryAction={
                  <Chip label={n.type} size="small" color={typeColor[n.type]} variant="outlined" />
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${typeColor[n.type]}.light`, color: `${typeColor[n.type]}.main` }}>
                    {typeIcon[n.type]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={n.isRead ? 400 : 600}>
                      {n.message}
                    </Typography>
                  }
                  secondary={n.sentAt}
                />
              </ListItem>
              {idx < MOCK_NOTIFICATIONS.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Layout>
  );
}
