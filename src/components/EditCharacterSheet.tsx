import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Grid, Container, Button } from '@mui/material';

const EditCharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<any>({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      const result = await axios.get(`https://ttrpg-backend.onrender.com/character/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCharacter(result.data);
    };
    fetchCharacter();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`https://ttrpg-backend.onrender.com/character/${id}`, character, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate(`/character-sheet/${id}`);
    } catch (error) {
      console.error("Failed to save the character sheet", error);
    }
  };

 const handleChange = (name: string, value: string | number) => {
  setCharacter((prev: Record<string, unknown>) => ({ ...prev, [name]: value }));
};

  return (
    <Container sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        {Object.keys(character).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              variant="outlined"
              fullWidth
              value={character[key as keyof typeof character] as string | number}
              onChange={e => handleChange(key, e.target.value)}
              sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }}
            />
          </Grid>
        ))}
        <Button 
          variant="contained" 
          onClick={handleSave} 
          sx={{ 
            backgroundColor: 'rgb(128, 0, 128)', 
            marginTop: '10px', 
            '&:hover': { 
              backgroundColor: 'rgb(70, 130, 180)' // default blue color when hovered
            } 
          }}
        >
          Save
        </Button>
      </Grid>
    </Container>
  );
};

export default EditCharacterSheet;