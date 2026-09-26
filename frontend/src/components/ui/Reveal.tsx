import type { ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type RevealVariant = 'up' | 'left' | 'right' | 'scale';

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: 'reveal',
  left: 'reveal reveal-left',
  right: 'reveal reveal-right',
  scale: 'reveal reveal-scale',
};

interface RevealProps {
  as?: ElementType;
  variant?: RevealVariant;
  className?: string;
  children: ReactNode;
}

/** Wraps any element so it fades/slides in the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', variant = 'up', className = '', children }: RevealProps) {
  const { ref, active } = useReveal<HTMLElement>();
  const classes = `${VARIANT_CLASS[variant]} ${active ? 'active' : ''} ${className}`.trim();

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
