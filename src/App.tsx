import React, { FC, useEffect } from 'react';
import './styles/App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import * as weatherActions from './app/featcher/weather';

import { HamburgerMenu } from './components/Header/humburger/menu/HamburgerMenu';
import { LocationInfo } from './components/LocationInfo';
import { Tabs } from './components/Tabs';
import { WeatherInfo } from './components/WeatherInfo';
import { Loader } from './components/Loader';
import { Header } from './components/Header';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { weather, forecastDays, askedLocation } = useAppSelector(
    (state) => state.weather
  );
  const { isMenuOpen } = useAppSelector((state) => state.menu);

  useEffect(() => {
    dispatch(weatherActions.init({ forecastDays, askedLocation }));
  }, [forecastDays, askedLocation]);

  return (
    <div className="App" id="App">
      <Header />
      {isMenuOpen && <HamburgerMenu />}
      {weather ? (
        <section className="sec_forecast">
          <LocationInfo />
          <Tabs />
          <WeatherInfo />
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
