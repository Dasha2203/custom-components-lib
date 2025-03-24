import { LiHTMLAttributes } from 'react';

export type MenuItemValue = string | number;

export type MenuItemProps = LiHTMLAttributes<HTMLLIElement> & {
  value: MenuItemValue;
  selected?: boolean;
  focused?: boolean;
};
