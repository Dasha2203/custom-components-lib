import React from 'react';
import clsx from 'clsx';
import { MenuItemProps } from './types';
import * as classes from './style.module.scss';

const MenuItem = ({ children, selected, focused, ...props }: MenuItemProps) => {
  return (
    <li
      tabIndex={-1}
      role="menuitem"
      className={clsx(
        classes.menuItem,
        selected && classes.menuItem_selected,
        focused && classes.menuItem_focused,
        props.className
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export default MenuItem;
