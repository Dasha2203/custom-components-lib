import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import ArrowDropDownIcon from '@/icons/ArrowDropDownIcon';
import Dropdown from './Dropdown/Dropdown';
import { MenuItemValue, MenuItemProps } from './MenuItem/types';
import { SelectProps } from './types';
import * as classes from './style.module.scss';

const Select = ({
  value,
  label,
  children,
  disabled,
  onChange,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleFocus = () => {
    if (disabled) return;

    setIsFocused(true);
    setIsOpen(true);
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (
      selectRef.current &&
      selectRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    resetStates();
  };

  const resetStates = () => {
    setIsOpen(false);
    setIsFocused(false);
    setFocusedIndex(null);
  };

  const handleSelect = (value: MenuItemValue) => {
    onChange(value);
    resetStates();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const options = React.Children.toArray(children);
    const optionsLength = React.Children.toArray(children).length;

    if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.min(prevIndex + 1, optionsLength - 1)
      );
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) =>
        prevIndex === null ? optionsLength - 1 : Math.max(prevIndex - 1, 0)
      );
    } else if (event.key === 'Enter' && focusedIndex !== null) {
      const el = options[focusedIndex];

      handleSelect(
        React.isValidElement<MenuItemProps>(el) ? el.props.value : ''
      );
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        resetStates();
      }
    };

    document.addEventListener('click', handleClickOutside, { signal });

    return () => {
      controller.abort();
    };
  }, []);

  const selectedChild = useMemo(() => {
    const el = React.Children.toArray(children).find((child) => {
      if (React.isValidElement<MenuItemProps>(child)) {
        return child.props.value == value;
      }
      return false;
    });

    return React.isValidElement<MenuItemProps>(el) ? el.props.children : null;
  }, [value, children]);

  return (
    <div
      ref={selectRef}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={clsx(
        classes.selectRoot,
        disabled && classes.selectRoot_disabled,
        isFocused && classes.selectRoot_open,
        (value || isFocused) && classes.selectRoot_active,
        props.className
      )}
      style={props.style}
    >
      <label className={classes.select__label}>{label}</label>
      <div className={classes.selectRoot__wrap}>
        <div
          tabIndex={0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-hidden={true}
          className={classes.select}
        >
          {selectedChild}
        </div>
        <input
          className={classes.select__input}
          aria-invalid="false"
          aria-hidden={true}
          tabIndex={-1}
          defaultValue={value}
        />
        <ArrowDropDownIcon className={classes.select__icon} />
        <fieldset aria-hidden="true" className={clsx(classes.select__fieldset)}>
          <legend className={classes.select__legend}>
            {label && <span>{label}</span>}
          </legend>
        </fieldset>
      </div>
      <Dropdown
        isOpen={isOpen}
        handleSelect={handleSelect}
        focused={focusedIndex}
        selected={value}
      >
        {children}
      </Dropdown>
    </div>
  );
};

export default Select;
