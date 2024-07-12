import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Card, CardContent, CardMedia, CardActions, Button, CircularProgress, Box } from '@mui/material';
import { RootState, AppDispatch } from '../store/store';
import { fetchCharacterDetail, updateCharacter } from '../store/slices/characterDetailSlice';
import CharacterForm from './CharacterForm';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { character, status } = useSelector((state: RootState) => state.characterDetail);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      const savedCharacter = localStorage.getItem(`character-${id}`);
      if (savedCharacter) {
        dispatch(updateCharacter(JSON.parse(savedCharacter)));
      } else {
        dispatch(fetchCharacterDetail(id));
      }
    }
  }, [dispatch, id]);

  const handleSave = (updatedCharacter: Character) => {
    localStorage.setItem(`character-${id}`, JSON.stringify(updatedCharacter));
    dispatch(updateCharacter(updatedCharacter));
    setEditMode(false);
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (status === 'failed') {
    return <Typography>Failed to load character details</Typography>;
  }

  const characterDetails = [
    { label: 'Height', value: `${character?.height} cm` },
    { label: 'Mass', value: `${character?.mass} kg` },
    { label: 'Hair Color', value: character?.hair_color },
    { label: 'Skin Color', value: character?.skin_color },
    { label: 'Eye Color', value: character?.eye_color },
    { label: 'Birth Year', value: character?.birth_year },
    { label: 'Gender', value: character?.gender },
  ];

  return (
    <Container>
      <Button
        component={Link}
        to="/"
        size="small"
        color="primary"
        sx={{
          marginTop: 2,
          transition: 'background-color 0.3s, color 0.3s',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        Back
      </Button>
      {character && !editMode ? (
        <Card sx={{ maxWidth: 300, margin: 'auto', mt: 5, backgroundColor: '#f0f4f7', boxShadow: 3, borderRadius: 2, '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
          <CardMedia
            component="img"
            alt={character.name}
            height="300"
            image={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            title={character.name}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              {character.name}
            </Typography>
            {characterDetails.map(detail => (
              <Typography variant="body1" key={detail.label}>
                <strong>{detail.label}:</strong> {detail.value}
              </Typography>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => setEditMode(true)}
              size="small"
              color="primary"
              sx={{
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      ) : (
        character && (
          <CharacterForm
            character={character}
            onSave={handleSave}
          />
        )
      )}
    </Container>
  );
};

export default CharacterDetail;
