import { HTMLAttributes } from 'react';
import { MenuItemValue } from './MenuItem/types';

export type SelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'value'
> & {
  label?: string;
  onChange?: (value: MenuItemValue) => void;
  value?: MenuItemValue;
  children?: React.ReactNode;
  disabled?: boolean;
};
