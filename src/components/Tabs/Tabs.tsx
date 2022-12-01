import React from 'react';
import classNames from 'classnames';
import style from './Tabs.module.scss';
import { Forecastday } from '../../types/Forecast';
import { getDate } from '../functions/getDate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as weatherActions from '../../app/featcher/weather';

export const Tabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { weather, selectedDay } = useAppSelector((state) => state.weather);

  const lastIndex = weather && weather.forecast.forecastday.length - 1;

  return (
    <div className={classNames(style.container, 'S--1-4', 'T--1-12')}>
      <div className={classNames(style.slider_pagination, 'S--1-4', 'T--1-12')}>
        <button
          className={classNames('buttonprev', style.slider_pagination_button)}
        >
          {'<'}
        </button>
        <button
          className={classNames('buttonnext', style.slider_pagination_button)}
        >
          {'>'}
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        breakpoints={{
          450: { slidesPerView: 4 },
          550: { slidesPerView: 5 },
          700: { slidesPerView: 6 },
          900: { slidesPerView: 7 },
        }}
        navigation={{
          prevEl: '.buttonprev',
          nextEl: '.buttonnext',
        }}
        loop={false}
      >
        {weather?.forecast.forecastday.map(
          (tab: Forecastday, index: number) => {
            const { date, day } = tab;

            const dateInfo = getDate(date);
            return (
              <SwiperSlide key={tab.date_epoch}>
                <div
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
                      <img src={day.condition.icon} alt={day.condition.text} />
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
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};
