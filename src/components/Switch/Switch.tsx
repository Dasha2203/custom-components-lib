import * as classes from './style.module.scss';
import React from 'react';
import { SwitchProps } from './types';
import clsx from 'clsx';

const Switch = ({ checked, disabled, ...props }: SwitchProps) => {
  return (
    <label
      className={clsx(
        classes.switch,
        checked && classes.switch_checked,
        disabled && classes.switch_disabled
      )}
    >
      <span className={classes.switch__toggle}>
        <input
          type={'checkbox'}
          className={classes.switch__input}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <span className={classes.switch__thumb}></span>
      </span>
      <span className={classes.switch__track}></span>
    </label>
  );
};

export default Switch;
