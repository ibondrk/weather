import React from 'react';
import style from './location.module.scss';
// import { Loader } from '../Loader';

import { useAppSelector } from '../../app/hooks';

export const LocationInfo: React.FC = () => {
  const { weather } = useAppSelector((state) => state.weather);

  return (
    <div>
      <h2 className={style.loc}>
        Forecast in {weather?.location.name} {weather?.location.region}
        {weather?.location.country}
        {/* {weather && (
        )} */}
        {weather?.location.country === 'Ukraine' && ' tryzub'}
      </h2>
    </div>
  );
};
