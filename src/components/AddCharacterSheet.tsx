import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

const AddCharacterSheet: React.FC = () => {
  const [formData, setFormData] = useState({
    character_name: '',
    player_name: '',
    class_level: '',
    background: '',
    race: '',
    alignment: '',
    experience_points: 0,
    inspiration: false,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    proficiency_bonus: 0,
    armor_class: 0,
    initiative: 0,
    speed: 0,
    hit_point_maximum: 0,
    current_hit_points: 0,
    temporary_hit_points: 0,
    hit_dice_total: '',
    hit_dice: '',
    death_save_successes: 0,
    death_save_failures: 0,
    personality_traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    features_traits: '',
    character_backstory: '',
    allies_organizations: '',
    additional_features_traits: '',
    spellcasting_class: '',
    spellcasting_ability: '',
    spell_save_dc: 0,
    spell_attack_bonus: 0,
    character_appearance: '',
    character_image: '',
    faction_symbol_image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    };

    try {
      await axios.post('https://ttrpg-backend.onrender.com/character', JSON.stringify(formData), config);
      navigate('/');
    } catch (error) {
      console.error('Failed to add character sheet', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        Add New Character Sheet
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                variant="outlined"
                fullWidth
                required={key === 'character_name'}
                name={key}
                value={formData[key as keyof typeof formData] as string | number}
                onChange={handleChange}
                type={typeof formData[key as keyof typeof formData] === 'number' ? 'number' : 'text'}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'rgba(173, 216, 230, 0.8)' }}>
              Add Character Sheet
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCharacterSheet;