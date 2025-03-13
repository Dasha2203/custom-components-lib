import React, { useState } from 'react';
import clsx from 'clsx';
import * as classes from './style.module.scss';
import { InputProps } from './types';

const TextField = ({
  error,
  helperText,
  label,
  value,
  onChange,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!value);

  const inputClasses = clsx(classes.textField__input, {
    [classes.textFieldRoot_active]: isFocused || value,
  });

  const rootClasses = clsx(classes.textFieldRoot, {
    [classes.textFieldRoot_error]: error,
    [classes.textFieldRoot_active]: isFocused || value,
  });

  return (
    <div className={rootClasses} data-testid="text-field">
      <div className={classes.textField}>
        <input
          {...props}
          value={value}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
        />
        <label className={classes.textField__label}>{label}</label>
        <fieldset aria-hidden="true" className={classes.fieldset}>
          <legend className={classes.fieldset__legend}>
            {label && <span>{label}</span>}
          </legend>
        </fieldset>
      </div>
      {helperText && (
        <p className={classes.textFieldRoot__helperText}>{helperText}</p>
      )}
    </div>
  );
};

export default TextField;
