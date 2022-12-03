import React from 'react';
import style from './location.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as weatherActions from '../../app/featcher/weather';

export const LocationInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { weather, askedLocation } = useAppSelector((state) => state.weather);

  return (
    <div>
      <h2 className={style.loc}>
        Forecast in {weather?.location.name} {weather?.location.region}
        {weather?.location.country}
        {weather?.location.country === 'Ukraine' && ' tryzub'}
      </h2>
      <select
        id="locationSelection"
        value={askedLocation}
        onChange={(event) => {
          dispatch(weatherActions.actions.setAskedLocation(event.target.value));
        }}
      >
        <option value="auto:ip">Місцезнаходження</option>
        <option value="Kiev">Київ</option>
        <option value="Kamelnitskiy">Хмельницький</option>
        <option value="Lviv">Львів</option>
        <option value="Vinnitsa">Вінниця</option>
      </select>
    </div>
  );
};
