import React, { useEffect } from 'react';
import style from './hamburgerMenu.module.scss';
import { Navigation } from '../../navigation';

import { useAppSelector } from '../../../../app/hooks';

export const HamburgerMenu: React.FC = () => {
  const { isMenuOpen } = useAppSelector((state) => state.menu);

  useEffect(() => {
    document.body.classList.add(style.lock_scroll);
    const App = document.getElementById('App');
    App?.classList.add(style.lock_scroll);

    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove(style.lock_scroll);
      App?.classList.remove(style.lock_scroll);
    };
  }, [isMenuOpen]);

  return (
    <div className={style.mob_nav}>
      <Navigation />
    </div>
  );
};
