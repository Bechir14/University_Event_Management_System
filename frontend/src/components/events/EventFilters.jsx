import {
  Box, TextField, FormControl, InputLabel, Select,
  MenuItem, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CATEGORIES = ['All', 'Seminar', 'Workshop', 'Career Fair', 'Student Activity', 'Conference'];
const STATUSES = ['All', 'Published', 'Draft', 'Cancelled'];

export default function EventFilters({ filters, onChange }) {
  const handleChange = (field) => (e) => onChange({ ...filters, [field]: e.target.value });

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
      <TextField
        placeholder="Search events..."
        size="small"
        value={filters.search}
        onChange={handleChange('search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 220 }}
      />
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select value={filters.category} label="Category" onChange={handleChange('category')}>
          {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select value={filters.status} label="Status" onChange={handleChange('status')}>
          {STATUSES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        label="From"
        type="date"
        size="small"
        value={filters.dateFrom}
        onChange={handleChange('dateFrom')}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
}
