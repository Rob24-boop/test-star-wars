import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CHARACTER_API_URL } from '../constants';
import axios from 'axios';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

interface CharactersState {
  characters: Character[];
  filteredCharacters: Character[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  search: string;
  page: number;
  count: number;
}

const initialState: CharactersState = {
  characters: [],
  filteredCharacters: [],
  status: 'idle',
  error: null,
  search: '',
  page: 1,
  count: 0,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page }: { page: number }) => {
    const response = await axios.get(`${CHARACTER_API_URL}/?page=${page}`);
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilteredCharacters(state) {
      if (state.search) {
        state.filteredCharacters = state.characters.filter(character => 
          character.name.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        state.filteredCharacters = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<{ results: Character[], count: number }>) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.count = Math.ceil(action.payload.count / 10);
        if (state.search) {
          state.filteredCharacters = state.characters.filter(character => 
            character.name.toLowerCase().includes(state.search.toLowerCase())
          );
        } else {
          state.filteredCharacters = [];
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch characters';
      });
  },
});

export const { setSearch, setPage, setFilteredCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
