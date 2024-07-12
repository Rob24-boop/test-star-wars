import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, TextField, Pagination, Card, CardContent, Typography, CardActionArea, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { fetchCharacters, setSearch, setPage, setFilteredCharacters } from '../store/slices/charactersSlice';
import { useDebounce } from '../hooks/useDebounce';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, count, search, page, status, filteredCharacters } = useSelector((state: RootState) => state.characters);
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    dispatch(fetchCharacters({ page }));
  }, [dispatch, page]);

  useEffect(() => {
      dispatch(setFilteredCharacters());
  }, [search, characters, dispatch]);

  const handleSearchChange = useDebounce((value: string) => {
    dispatch(setSearch(value));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalSearch(e.target.value);
    handleSearchChange(e.target.value);
  };

  return (
    <Container>
      <TextField
        label="Search"
        value={localSearch}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {status === 'loading' ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {(filteredCharacters.length > 0 ? filteredCharacters : characters).map((character) => (
            <Grid item xs={12} sm={6} md={4} key={character.name}>
              <Card
                sx={{
                  backgroundColor: '#f0f4f7',
                  boxShadow: 3,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  },
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
              >
                <CardActionArea component={Link} to={`/character/${character.url.split('/').slice(-2, -1)[0]}`}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>{character.name}</Typography>
                    <Typography variant="body2" color="textSecondary">Birth Year: {character.birth_year}</Typography>
                    <Typography variant="body2" color="textSecondary">Gender: {character.gender}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination 
        count={count} 
        page={page} 
        onChange={(e, value) => dispatch(setPage(value))} 
      />
    </Container>
  );
};

export default CharacterList;
