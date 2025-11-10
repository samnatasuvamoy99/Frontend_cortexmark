import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FilterType = 'all' | 'twitter' | 'youtube' | 'documents' | 'others';

interface FilterState {
  activeFilter: FilterType;
}

const initialState: FilterState = {
  activeFilter: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.activeFilter = action.payload;
    },
    clearFilter: (state) => {
      state.activeFilter = 'all';
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
