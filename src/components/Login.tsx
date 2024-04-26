import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://ttrpg-backend.onrender.com/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <Container sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <form onSubmit={handleLogin}>
        <Typography variant="h6" sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }}>Login</Typography>
        <TextField label="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }} />
        <TextField label="Password" type="password" fullWidth required value={password} onChange={e => setPassword(e.target.value)} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }} />
        <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'rgb(70, 130, 180)' } }}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;