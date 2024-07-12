import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CharacterList from '../components/CharacterList';

const mockStore = configureStore([]);
const initialState = {
  characters: {
    characters: [
      {
        name: 'Luke Skywalker',
        url: 'https://swapi.dev/api/people/1/',
        birth_year: '19BBY',
        gender: 'male',
      },
    ],
    count: 1,
    search: '',
    page: 1,
    status: 'idle',
    filteredCharacters: [],
  },
};

describe('CharacterList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders character list', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </Provider>
    );

    const characterName = screen.getByText(/Luke Skywalker/i);
    expect(characterName).toBeInTheDocument();
  });
});
