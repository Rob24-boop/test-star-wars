import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CharacterDetail from '../components/CharacterDetail';

const mockStore = configureStore([]);
const initialState = {
  characterDetail: {
    character: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    },
    status: 'succeeded',
    error: null,
  },
};

describe('CharacterDetail', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders character details', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/character/1`]}>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const characterName = screen.getByText(/Luke Skywalker/i);
    expect(characterName).toBeInTheDocument();
    const characterHeight = screen.getByText(/Height: 172 cm/i);
    expect(characterHeight).toBeInTheDocument();
    const characterMass = screen.getByText(/Mass: 77 kg/i);
    expect(characterMass).toBeInTheDocument();
  });
});
