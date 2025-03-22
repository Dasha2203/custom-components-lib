import React, { useRef } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { MenuItemProps } from '../MenuItem/types';
import { DropdownProps } from './types';
import * as classes from './style.module.scss';

const Dropdown = ({
  isOpen,
  children,
  handleSelect,
  focused,
  selected,
}: DropdownProps) => {
  const listboxRef = useRef<HTMLUListElement | null>(null);

  return (
    <>
      {isOpen && (
        <ul
          className={classes.dropdown}
          role="listbox"
          ref={listboxRef}
          tabIndex={-1}
          data-testid="select-dropdown"
        >
          {React.Children.map(children, (child, index) => {
            if (
              React.isValidElement<MenuItemProps>(child) &&
              child.props.value !== undefined
            ) {
              return (
                <MenuItem
                  key={child.props.value}
                  value={child.props.value}
                  onClick={() => handleSelect(child.props.value)}
                  selected={selected == child.props.value}
                  focused={focused === index}
                >
                  {child.props.children}
                </MenuItem>
              );
            }
            return null;
          })}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
