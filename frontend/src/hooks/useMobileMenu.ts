import { useEffect, useState } from 'react';

/** Mobile nav open/close state; locks page scroll while open, like the original. */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((open) => !open);

  return { isOpen, close, toggle };
}
