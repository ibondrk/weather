import React from 'react';
import style from './navigation.module.scss';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as weatherActions from '../../../app/featcher/weather';
import * as menuActions from '../../../app/featcher/menu';

export const Navigation: React.FC = () => {
  const animateFrom = { opacity: 0, x: 40 };
  const animateTo = { opacity: 1, x: 0 };

  const dispatch = useAppDispatch();
  const { forecastDays } = useAppSelector((state) => state.weather);

  return (
    <nav>
      <ul className={style.nav_list}>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.05 }}
          className={style.nav_item}
        >
          <div
            className={classNames(style.nav_link, {
              [style.choosed_link]: forecastDays === 1,
            })}
            onClick={() => {
              dispatch(weatherActions.actions.setForecastDays(1));
              dispatch(menuActions.toggleMenu(false));
            }}
          >
            Сьогодні
          </div>
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.1 }}
          className={style.nav_item}
        >
          <div
            className={classNames(style.nav_link, {
              [style.choosed_link]: forecastDays === 3,
            })}
            onClick={() => {
              dispatch(weatherActions.actions.setForecastDays(3));
              dispatch(menuActions.toggleMenu(false));
            }}
          >
            3 дні
          </div>
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.2 }}
          className={style.nav_item}
        >
          <div
            className={classNames(style.nav_link, {
              [style.choosed_link]: forecastDays === 7,
            })}
            onClick={() => {
              dispatch(weatherActions.actions.setForecastDays(7));
              dispatch(menuActions.toggleMenu(false));
            }}
          >
            Тиждень
          </div>
        </motion.li>
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.3 }}
          className={style.nav_item}
        >
          <div
            className={classNames(style.nav_link, {
              [style.choosed_link]: forecastDays === 14,
            })}
            onClick={() => {
              dispatch(weatherActions.actions.setForecastDays(14));
              dispatch(menuActions.toggleMenu(false));
            }}
          >
            14 днів
          </div>
        </motion.li>
      </ul>
    </nav>
  );
};
