import { useEffect, useState } from 'react';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Brief branded loading screen shown while the page's initial assets settle. */
export function PageLoader() {
  const [hidden, setHidden] = useState(prefersReducedMotion);

  useEffect(() => {
    if (hidden) return; // Already resolved from the lazy initial state above.
    const timer = window.setTimeout(() => setHidden(true), 500);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  return (
    <div className={`page-loader ${hidden ? 'hide' : ''}`} aria-hidden={hidden}>
      <div className="loader-circle" />
      <p>Loading...</p>
    </div>
  );
}
