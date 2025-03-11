import { HTMLAttributes } from 'react';

export const buttonVariant = ['text', 'outlined', 'contained'] as const;
export type ButtonVariant = (typeof buttonVariant)[number];

export const buttonSizes = ['small', 'medium', 'large'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type BtnProps = CommonProps &
  HTMLAttributes<HTMLButtonElement> & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  };

type AnchorProps = CommonProps &
  HTMLAttributes<HTMLAnchorElement> & {
    href: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
  };

export type ButtonProps = BtnProps | AnchorProps;
