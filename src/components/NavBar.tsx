import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token'); // remove the token from local storage
    navigate('/login'); // redirect the user to the login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'red' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '10px' }}>
          TTRPG Grimoire
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/" sx={{ marginRight: '20px', '&:hover': { boxShadow: '0 0 10px purple' } }}>Dashboard</Button>
            <Button color="inherit" component={Link} to="/edit-user" sx={{ marginRight: '20px', '&:hover': { boxShadow: '0 0 10px purple' } }}>Edit User</Button>
            <Button color="inherit" onClick={handleSignOut} sx={{ marginRight: '20px', '&:hover': { boxShadow: '0 0 10px purple' } }}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" sx={{ marginRight: '20px', '&:hover': { boxShadow: '0 0 10px purple' } }}>Log In</Button>
            <Button color="inherit" component={Link} to="/signup" sx={{ marginRight: '20px', '&:hover': { boxShadow: '0 0 10px purple' } }}>Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;