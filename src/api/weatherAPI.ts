import { Weather } from '../types/Weather';
import { client } from '../utils/fetchClient';

const key = '4458a22571d74f7988c202157223011';
const lang = 'uk';

export const getWeather = (days: number, city = 'auto:ip') => {
  return client.get<Weather>(
    `forecast.json?key=${key}&q=${city}&lang=${lang}&days=${days}`
  );
};
