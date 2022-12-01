import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './featcher/weather';
import themeSlice from './featcher/theme';
import menuSlice from './featcher/menu';

const store = configureStore({
  reducer: {
    weather: weatherSlice,
    theme: themeSlice,
    menu: menuSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
