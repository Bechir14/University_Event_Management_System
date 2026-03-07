import {
  Box, Typography, Paper, Rating, TextField, Button,
  Breadcrumbs, Link, Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) return;
    // TODO: POST /api/feedback/ { event_id: id, rating, comment }
    setSubmitted(true);
  };

  return (
    <Layout maxWidth="sm">
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component="button" underline="hover" color="inherit" onClick={() => navigate('/my-registrations')}>
          My Registrations
        </Link>
        <Typography color="text.primary">Feedback</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={700} gutterBottom>Submit Feedback</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Share your experience for <strong>AI & ML Workshop</strong>
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you! Your feedback has been submitted.
        </Alert>
      ) : (
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>Overall Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, val) => setRating(val)}
            size="large"
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Comments</Typography>
          <TextField
            multiline
            rows={5}
            fullWidth
            placeholder="Tell us what you liked, what could be improved..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => navigate('/my-registrations')}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!rating}>
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      )}
    </Layout>
  );
}
