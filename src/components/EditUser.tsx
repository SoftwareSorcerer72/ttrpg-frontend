import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const EditUser: React.FC = () => {
  const [user, setUser] = useState({ email: '', username: '' });

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const result = await axios.get('https://ttrpg-backend.onrender.com/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(result.data);
    };
    fetchUserData();
  }, []);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put('http://localhost:5000/user', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('User updated successfully');
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:5000/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.removeItem('token');
      window.location.href = '/';
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <Container sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <form onSubmit={handleUpdate}>
        <TextField label="Email" type="email" fullWidth required value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }} />
        <TextField label="Username" fullWidth required value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }} />
        <Button type="submit" color="primary" variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'rgb(70, 130, 180)' } }}>Update</Button>
        <Button color="secondary" variant="contained" onClick={handleDelete} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'orange' } }}>Delete Account</Button>
      </form>
    </Container>
  );
};

export default EditUser;