import { useEffect, useRef, useState } from 'react';

/** Counts up from 0 to `target` once the element scrolls into view. */
export function useAnimatedCounter<T extends HTMLElement>(target: number, durationMs = 1500) {
  const ref = useRef<T | null>(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / durationMs, 1);
          setValue(Math.round(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs, reducedMotion]);

  return { ref, value };
}
