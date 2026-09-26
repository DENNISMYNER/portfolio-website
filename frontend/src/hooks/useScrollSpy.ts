import { useEffect, useState } from 'react';

interface ScrollSpyResult {
  activeId: string;
  isScrolled: boolean;
  showBackToTop: boolean;
}

/**
 * Tracks scroll position for three original behaviours at once (one shared
 * scroll listener instead of three): which section is active in the nav, the
 * header's "scrolled" shadow, and whether the back-to-top button should show.
 */
export function useScrollSpy(sectionIds: readonly string[]): ScrollSpyResult {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const HEADER_OFFSET = 150;

    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);

      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (window.scrollY >= el.offsetTop - HEADER_OFFSET) current = id;
      }
      setActiveId(current);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return { activeId, isScrolled, showBackToTop };
}
