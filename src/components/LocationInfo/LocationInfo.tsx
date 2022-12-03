import React from 'react';
import style from './location.module.scss';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as weatherActions from '../../app/featcher/weather';

export const LocationInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { weather, askedLocation } = useAppSelector((state) => state.weather);

  return (
    <div className={classNames(style.loc, 'S--1-4', 'T--1-12')}>
      <h2 className={(style.loc_title, 'T--1-3')}>
        Forecast in
        {` ${weather?.location.name} ${weather?.location.region} ${weather?.location.country}`}
        {weather?.location.country === 'Ukraine' && ' tryzub'}
      </h2>
      <select
        id="locationSelection"
        value={askedLocation}
        onChange={(event) => {
          dispatch(weatherActions.actions.setAskedLocation(event.target.value));
        }}
        className={classNames(style.loc_select, 'S--3-4', 'T--5-6')}
      >
        <option value="auto:ip" className={style.loc_select_options}>
          Місцезнаходження
        </option>
        <option value="Kiev">Київ</option>
        <option value="Kamelnitskiy">Хмельницький</option>
        <option value="Lviv">Львів</option>
        <option value="Vinnitsa">Вінниця</option>
      </select>
    </div>
  );
};
