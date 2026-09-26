import { useEffect } from 'react';
import { navLinks, profile } from '../../data/portfolio';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useTheme } from '../../hooks/useTheme';

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export function Header() {
  const { activeId, isScrolled } = useScrollSpy(SECTION_IDS);
  const { isOpen, close, toggle } = useMobileMenu();
  const { theme, toggleTheme } = useTheme();

  // Close the mobile menu automatically if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) close();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="logo" onClick={close}>
            <span>{profile.logoInitial}</span>
            {profile.name.split(' ').slice(1).join(' ')}
          </a>

          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeId === link.href.slice(1) ? 'active' : ''}`}
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/Dennis-Maina-CV.pdf" className="btn btn-primary" download>
            Download CV
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            className={`menu-toggle ${isOpen ? 'active' : ''}`}
            onClick={toggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
