import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getWeather } from '../../api/weatherAPI';
import { Weather } from '../../types/Weather';
import { Forecastday } from '../../types/Forecast';

type WeatherState = {
  weather: Weather | null;
  loading: boolean;
  error: string;
  selectedDay: Forecastday | null;
  forecastDays: number;
};

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: '',
  selectedDay: null,
  forecastDays: 7,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<Forecastday>) => {
      state.selectedDay = action.payload;
    },
    setForecastDays: (state, action: PayloadAction<number>) => {
      state.forecastDays = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.selectedDay = state.weather.forecast.forecastday[0];
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong. Please, refresh page';
    });
  },
});

export const init = createAsyncThunk(
  'weather/fetch',
  async (forecastDays: number) => {
    return getWeather(forecastDays);
  }
);

export const { actions } = weatherSlice;

export default weatherSlice.reducer;
