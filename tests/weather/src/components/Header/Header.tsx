import React from 'react';
import style from './header.module.scss';
import { HamburgerIcon } from './humburger/icon';
import { Navigation } from './navigation';
import { Theme } from '../Theme';

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.main_wrapper}>
        <div className={style.nav_bar}>
          <div className={style.PC_navigation}>
            <Navigation />
          </div>
        </div>
      </div>
      <Theme />

      <HamburgerIcon />
    </header>
  );
};
