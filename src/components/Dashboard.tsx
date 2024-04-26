import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard: React.FC = () => {
  const [characterSheets, setCharacterSheets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://ttrpg-backend.onrender.com/character', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCharacterSheets(result.data);
    };
    fetchData();
  }, []);

  const deleteCharacter = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/character/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCharacterSheets(characterSheets.filter(sheet => sheet.id !== id));
    } catch (error) {
      console.error("Failed to delete the character sheet", error);
    }
  };

  return (
    <Container sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
      <Typography variant="h4" sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)' }}>Dashboard</Typography>
      <Button 
  variant="contained" 
  component={Link} 
  to="/add-character-sheet" 
  sx={{ backgroundColor: 'purple', alignSelf: 'flex-start' }}
>
  Add Character Sheet
</Button>
      <List>
        {characterSheets.map(sheet => (
          <ListItem key={sheet.id} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }}>
            <ListItemText
              primary={<Link to={`/character-sheet/${sheet.id}`}>{sheet.character_name}</Link>}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteCharacter(sheet.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;