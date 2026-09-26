import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { useRipple } from '../../hooks/useRipple';

type Variant = 'primary' | 'secondary';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
}

type AnchorButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' };

type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

/** The pill-shaped `.btn` from the original site, as a link or a submit button, with the click ripple. */
export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const ripple = useRipple();
  const classes = `btn btn-${variant} ${className}`.trim();

  if (props.as === 'button') {
    const { as: _as, ...rest } = props;
    return (
      <button className={classes} onClick={ripple} {...rest}>
        {children}
      </button>
    );
  }

  // href is pulled out and always rendered explicitly (rather than left inside `...rest`)
  // so static analysis can see this anchor is a real link, not a clickable non-link element.
  const { as: _as, href, ...rest } = props as AnchorButtonProps;
  return (
    <a className={classes} href={href} onClick={ripple} {...rest}>
      {children}
    </a>
  );
}
