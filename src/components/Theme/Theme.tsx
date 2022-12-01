import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import style from './theme.module.scss';
import * as themeActions from '../../app/featcher/theme';

export const Theme: React.FC = () => {
  const dispatch = useAppDispatch();
  const { themeName } = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = themeName;
  }, [themeName]);

  const handleThemeChange = () => {
    const next = themeName === 'dark' ? 'light' : 'dark';
    dispatch(themeActions.setTheme(next));
  };

  return (
    <label htmlFor="toggler">
      <input
        id="toggler"
        type="checkbox"
        onChange={handleThemeChange}
        checked={themeName === 'dark'}
        readOnly
      />
      <span className={classNames(style.buttonSwitcher)} />
    </label>
  );
};
