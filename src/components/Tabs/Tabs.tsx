import React from 'react';
import classNames from 'classnames';
import style from './Tabs.module.scss';
import { Forecastday } from '../../types/Forecast';

import { getDate } from '../functions/getDate';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as weatherActions from '../../app/featcher/weather';

export const Tabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { weather, selectedDay } = useAppSelector((state) => state.weather);

  const lastIndex = weather && weather.forecast.forecastday.length - 1;

  return (
    <>
      {weather && (
        <div className={classNames(style.tabs, 'S--1-4', 'T--1-12', 'D--1-12')}>
          <ul
            className={classNames(
              style.tabs_list,
              'S--1-4',
              'T--1-12',
              'D--1-12'
            )}
          >
            {weather.forecast.forecastday.map(
              (tab: Forecastday, index: number) => {
                const { date, day } = tab;

                const dateInfo = getDate(date);
                return (
                  <li
                    key={tab.date_epoch}
                    className={classNames(
                      selectedDay?.date === date
                        ? style.isActive
                        : style.tabs_item,
                      index !== 0 && style.notFirst,
                      lastIndex !== index && style.notLast
                    )}
                  >
                    <a
                      href={tab.date}
                      className={style.tabs_link}
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(weatherActions.actions.setSelectedDay(tab));
                      }}
                    >
                      <div className={style.tabs_date}>
                        <p className={style.tabs_date_description}>
                          {dateInfo[0]}
                        </p>
                        <p className={style.tabs_date_numb}>{dateInfo[1]}</p>
                        <p className={style.tabs_date_description}>
                          {dateInfo[2]}
                        </p>
                      </div>

                      <div title={day.condition.text}>
                        <img
                          src={day.condition.icon}
                          alt={day.condition.text}
                        />
                      </div>

                      <p>{Math.round(day.avgtemp_c)}°</p>

                      <div className={style.tabs_temperature}>
                        <div className={style.description}>
                          <p className={style.description_text}>мін.</p>
                          <p>{Math.round(day.mintemp_c)}°</p>
                        </div>

                        <div className={style.description}>
                          <p className={style.description_text}>макс.</p>
                          <p>{Math.round(day.maxtemp_c)}°</p>
                        </div>
                      </div>
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
};
