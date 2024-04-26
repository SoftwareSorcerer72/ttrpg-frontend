import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Grid, Container } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CharacterSheet: React.FC = () => {
  const [character, setCharacter] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      const result = await axios.get(`http://localhost:5000/character/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCharacter(result.data);
    };
    fetchCharacter();
  }, [id]);

  return (
    <Container sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', padding: '20px', borderRadius: '10px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Grid container spacing={2}>
        {Object.keys(character).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={character[key as keyof typeof character] as string | number}
              sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)', marginBottom: '10px' }}
            />
          </Grid>
        ))}
      </Grid>
      <Button 
        variant="contained" 
        component={Link} 
        to={`/edit-character-sheet/${id}`} 
        sx={{ backgroundColor: 'purple', alignSelf: 'flex-start' }}
      >
        Edit Character Sheet
      </Button>
    </Container>
  );
  
};

export default CharacterSheet;