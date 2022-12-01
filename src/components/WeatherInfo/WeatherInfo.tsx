import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './weatherInfo.module.scss';
import { getDate } from '../functions/getDate';

import { Hour } from '../../types/Forecast';

import { useAppSelector } from '../../app/hooks';

export const WeatherInfo: React.FC = () => {
  const { selectedDay } = useAppSelector((state) => state.weather);
  const [weatherByHours, setWeatherByHours] = useState<Hour[]>([]);
  const [markedTime, setMarkedTime] = useState<string>('');
  const [date, setDate] = useState<string[]>([]);

  useEffect(() => {
    const weatherEachHour = [];
    if (!selectedDay) {
      return;
    }

    for (let i = 1; i <= 24; i += 3) {
      weatherEachHour.push(selectedDay.hour[i]);
    }
    setWeatherByHours(weatherEachHour);

    const selectedDate = getDate(selectedDay.date);
    setDate(selectedDate);

    if (selectedDate.at(1) === String(new Date().getDate())) {
      const currentHour = new Date().getHours();

      const predicteNow =
        weatherEachHour.find((hour) => {
          const getArrHour = new Date(hour.time).getHours();

          return getArrHour > currentHour;
        }) || weatherEachHour.at(weatherEachHour.length - 1);

      if (!predicteNow) {
        return;
      }
      setMarkedTime(predicteNow.time);
    }

    return () => {
      setWeatherByHours([]);
      setMarkedTime('');
    };
  }, [selectedDay]);

  return (
    <div
      className={classNames(
        style.forecast_mainInfo,
        'S--1-4',
        'T--1-10',
        'D--1-10'
      )}
    >
      <div className={classNames(style.date_block, 'S--1-1')}>
        <p className={style.date_block_weekday}>{date.at(0)}</p>
        <p className={style.date_block_date}>{date.at(1)}</p>
        <p className={style.date_block_month}>{date.at(2)}</p>
      </div>
      <div className={classNames(style.weather_details, 'S--2-4', 'T--2-10')}>
        <table className={style.table}>
          <thead className={style.table_head}>
            <tr>
              <td>&nbsp;</td>
              <td className={style.table_elem} colSpan={2}>
                Ніч
              </td>
              <td className={style.table_elem} colSpan={2}>
                Ранок
              </td>
              <td className={style.table_elem} colSpan={2}>
                День
              </td>
              <td className={style.table_elem} colSpan={2}>
                Вечір
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time ? style.selected_odd : style.odd
                    )}
                  >
                    {hour.time.slice(hour.time.indexOf(' '))}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>&nbsp;</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    title={hour.condition.text}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time && style.selected_even
                    )}
                  >
                    <img src={hour.condition.icon} alt={hour.condition.text} />
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={style.table_description}>Температура</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time ? style.selected_odd : style.odd
                    )}
                  >
                    <p>{Math.round(hour.temp_c)} °C</p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={style.table_description}>Відчувається</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time && style.selected_even
                    )}
                  >
                    <p>{Math.round(hour.feelslike_c)} °C</p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={style.table_description}>Вітер, м/с</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    title={'Вітер'}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time ? style.selected_odd : style.odd
                    )}
                  >
                    <p>{((hour.wind_kph * 1000) / 3600).toFixed(2)}</p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={style.table_description}>Вологість, %</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    title={'Вологість'}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time && style.selected_even
                    )}
                  >
                    <p>{hour.humidity}</p>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={style.table_description}>Тиск, мм</td>
              {weatherByHours.map((hour) => {
                return (
                  <td
                    key={hour.time_epoch}
                    title={'Тиск, мм рт.ст.'}
                    className={classNames(
                      style.table_elem,
                      markedTime === hour.time ? style.selected_odd : style.odd
                    )}
                  >
                    <p>{Math.trunc(hour.pressure_mb * 0.750063755419211)}</p>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
