import clsx from 'clsx';

import * as classes from './style.module.scss';
import { ButtonProps } from './types';

const Button = ({
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  ...props
}: ButtonProps) => {
  const className = clsx(
    classes.button,
    classes[`button_${variant}`],
    classes[`button_${size}`],
    classes[`button_${color}`],
    props.className
  );

  if ('href' in props) {
    const { href, target, ...restProps } = props;

    return (
      <a className={className} href={href} target={target} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
