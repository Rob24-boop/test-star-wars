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
}

interface CharacterDetailState {
  character: Character | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CharacterDetailState = {
  character: null,
  status: 'idle',
  error: null,
};

export const fetchCharacterDetail = createAsyncThunk(
  'characterDetail/fetchCharacterDetail',
  async (id: string) => {
    const response = await axios.get(`${CHARACTER_API_URL}/${id}/`);
    return response.data;
  }
);

const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState,
  reducers: {
    updateCharacter(state, action: PayloadAction<Character>) {
      state.character = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacterDetail.fulfilled, (state, action: PayloadAction<Character>) => {
        state.status = 'succeeded';
        state.character = action.payload;
      })
      .addCase(fetchCharacterDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch character details';
      });
  },
});

export const { updateCharacter } = characterDetailSlice.actions;

export default characterDetailSlice.reducer;
