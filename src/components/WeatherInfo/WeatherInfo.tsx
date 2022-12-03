import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './weatherInfo.module.scss';
import { getDate } from '../functions/getDate';

import { Hour } from '../../types/Forecast';

import { useAppSelector } from '../../app/hooks';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';

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

    for (let i = 1; i <= selectedDay.hour.length; i += 3) {
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
    <div className={classNames(style.forecast_mainInfo, 'S--1-4', 'T--1-12')}>
      <div className={classNames(style.date_block, 'T--1-1')}>
        <p className={style.date_block_weekday}>{date.at(0)}</p>
        <p className={style.date_block_date}>{date.at(1)}</p>
        <p className={style.date_block_month}>{date.at(2)}</p>
      </div>
      <div className={style.description}>
        <div className={style.description_space}>&nbsp;</div>
        <p>Температура</p>
        <p>Відчувається</p>
        <p>Вітер, м/с</p>
        <p>Вологість, %</p>
        <p>Тиск, мм</p>
      </div>
      <div className={classNames(style.table)}>
        <Swiper
          modules={[Pagination]}
          slidesPerView={4}
          breakpoints={{
            400: { slidesPerView: 5 },
            450: { slidesPerView: 6 },
            550: { slidesPerView: 7 },
            700: { slidesPerView: 8 },
          }}
          loop={false}
        >
          {weatherByHours.map((hour) => {
            return (
              <SwiperSlide key={hour.time_epoch}>
                <p
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time ? style.selected_odd : style.odd
                  )}
                >
                  {hour.time.slice(hour.time.indexOf(' '))}
                </p>
                <div
                  className={classNames(
                    style.table_item,
                    markedTime === hour.time && style.selected_even
                  )}
                >
                  <img
                    title={hour.condition.text}
                    className={style.table_item_elem}
                    src={hour.condition.icon}
                    alt={hour.condition.text}
                  />
                </div>
                <p
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time ? style.selected_odd : style.odd
                  )}
                >
                  {Math.round(hour.temp_c)} °C
                </p>
                <p
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time && style.selected_even
                  )}
                >
                  {Math.round(hour.feelslike_c)} °C
                </p>
                <p
                  title={'Вітер'}
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time ? style.selected_odd : style.odd
                  )}
                >
                  {((hour.wind_kph * 1000) / 3600).toFixed(2)}
                </p>
                <p
                  title={'Вологість'}
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time && style.selected_even
                  )}
                >
                  {hour.humidity}
                </p>
                <p
                  title={'Тиск, мм рт.ст.'}
                  className={classNames(
                    style.table_item_elem,
                    markedTime === hour.time ? style.selected_odd : style.odd
                  )}
                >
                  {Math.trunc(hour.pressure_mb * 0.750063755419211)}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
