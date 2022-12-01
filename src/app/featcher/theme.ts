import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store from 'store';

type themeState = {
  themeName: string;
};

const getTheme = (): string => {
  const themeTree = store.get('theme');

  if (themeTree) {
    return themeTree.themeName;
  }

  return 'light';
};

const initialState: themeState = {
  themeName: getTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      store.set('theme', { themeName: action.payload });
      state.themeName = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
