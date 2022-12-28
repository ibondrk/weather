import { Weather } from '../types/Weather';
import { client } from '../utils/fetchClient';

const API_KEY = process.env.REACT_APP_API_KEY;
const lang = 'uk';

export const getWeather = (days: number, city: string) => {
  return client.get<Weather>(
    `forecast.json?key=${API_KEY}&q=${city}&lang=${lang}&days=${days}`
  );
};
