import { HTMLAttributes } from 'react';

export const buttonColor = [
  'primary',
  'secondary',
  'success',
  'error',
] as const;
export type ButtonColor = (typeof buttonColor)[number];

export const buttonVariant = ['text', 'outlined', 'contained'] as const;
export type ButtonVariant = (typeof buttonVariant)[number];

export const buttonSizes = ['small', 'medium', 'large'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export type ButtonCommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
};

type BtnProps = ButtonCommonProps &
  HTMLAttributes<HTMLButtonElement> & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  };

type AnchorProps = ButtonCommonProps &
  HTMLAttributes<HTMLAnchorElement> & {
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
  };

export type ButtonProps = BtnProps | AnchorProps;
