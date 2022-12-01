import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type menuState = {
  isMenuOpen: boolean;
};

const initialState: menuState = {
  isMenuOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer;
