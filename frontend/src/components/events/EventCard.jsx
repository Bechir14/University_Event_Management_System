import {
  Card, CardContent, CardActions, Typography, Chip,
  Button, Box, Avatar,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

const statusColor = { published: 'success', draft: 'default', cancelled: 'error' };

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const {
    id, title, category, location, startDate, capacity, spotsLeft, status,
  } = event;

  return (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Color header bar */}
      <Box sx={{ height: 6, bgcolor: 'primary.main' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip label={category} size="small" variant="outlined" color="primary" />
          <Chip label={status} size="small" color={statusColor[status] || 'default'} />
        </Box>
        <Typography variant="h6" gutterBottom noWrap>{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <CalendarTodayIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{startDate}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{location}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PeopleIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {spotsLeft} / {capacity} spots left
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={() => navigate(`/events/${id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
