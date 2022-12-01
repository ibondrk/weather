import { Weather } from '../types/Weather';
import { client } from '../utils/fetchClient';

const key = '4458a22571d74f7988c202157223011';
const lang = 'uk';

export const getWeather = (days: number) => {
  return client.get<Weather>(
    `forecast.json?key=${key}&q=kamelnitskiy&lang=${lang}&days=${days}`
  );
};
