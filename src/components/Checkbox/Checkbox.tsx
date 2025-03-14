import React from 'react';
import clsx from 'clsx';
import * as classes from './style.module.scss';
import { CheckboxProps } from './types';
import CheckedIcon from '@/icons/CheckedIcon';
import UnCheckedIcon from '@/icons/UnCheckedIcon';

const Checkbox = ({
  label,
  checked,
  disabled,
  onChange,
  className,
  style,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={clsx(
        classes.checkbox,
        checked && classes.checkbox_checked,
        disabled && classes.checkbox_disabled,
        className
      )}
      style={style}
    >
      <span className={classes.checkbox__wrap}>
        <input
          type="checkbox"
          className={classes.checkbox__input}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-checked={checked}
          {...props}
        />

        {checked ? (
          <CheckedIcon
            className={classes.checkbox__icon}
            focusable="false"
            aria-hidden="true"
          />
        ) : (
          <UnCheckedIcon
            className={classes.checkbox__icon}
            focusable="false"
            aria-hidden="true"
          />
        )}
      </span>
      {label && <span className={classes.checkbox__label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
