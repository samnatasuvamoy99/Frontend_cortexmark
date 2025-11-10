import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
