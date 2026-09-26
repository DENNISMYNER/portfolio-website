import { navLinks } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Icon } from '../ui/icons';

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export function BackToTop() {
  const { showBackToTop } = useScrollSpy(SECTION_IDS);

  return (
    <a href="#home" className={`back-to-top ${showBackToTop ? 'show' : ''}`} aria-label="Back to top">
      <Icon name="arrowUp" />
    </a>
  );
}
