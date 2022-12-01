import React from 'react';
import style from './loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.loader}>
      <div className={style.loader_wave_f}></div>
      <div className={style.loader_wave_s}></div>
    </div>
  );
};
