import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import useApi from '../../../core/api-service/useApi';
import { API_ENDPOINTS } from '../../../core/utils/apiEndpoints';
const LoginPage = () => {
  const { post } = useApi();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login Submitted:', form);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Skip-Interceptor': 'false',
      };
  
    try {
      const data = await post(`${API_ENDPOINTS.auth.token}`, form,headers);
      if (data?.status === 200) {
        console.log('jai', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: 8 }}
    >
      <Typography variant="h5" mb={3}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            name="email"
            label=""
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            required
            name="password"
            label=""
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </Box>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#FF7000', textTransform: 'none' }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default LoginPage;
