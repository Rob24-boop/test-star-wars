import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import characterDetailReducer from './slices/characterDetailSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
