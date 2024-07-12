import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCharacter } from '../store/slices/characterDetailSlice';

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

const characterKeys: (keyof Character)[] = [
  "name",
  "height",
  "mass",
  "hair_color",
  "skin_color",
  "eye_color",
  "birth_year",
  "gender",
];

interface CharacterFormProps {
  character: Character;
  onSave: (character: Character) => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ character, onSave }) => {
  const { control, handleSubmit } = useForm<Character>({
    defaultValues: character,
  });

  const dispatch = useDispatch();

  const onSubmit = (data: Character) => {
    localStorage.setItem(`character-${character.name}`, JSON.stringify(data));
    dispatch(updateCharacter(data));
    onSave(data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        {characterKeys.map((key) => (
          <Controller
            key={key}
            name={key}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={key.replace('_', ' ')}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
          />
        ))}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onSave(character)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CharacterForm;
