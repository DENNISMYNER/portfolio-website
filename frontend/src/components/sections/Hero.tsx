import { useEffect, useRef } from 'react';
import { profile, socialLinks } from '../../data/portfolio';
import { Button } from '../ui/Button';
import { Icon } from '../ui/icons';

/** Subtle mouse-parallax on the hero illustration, matching the original effect. */
function useHeroParallax() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function handleMouseMove(event: MouseEvent) {
      const x = (window.innerWidth / 2 - event.clientX) / 40;
      const y = (window.innerHeight / 2 - event.clientY) / 40;
      if (node) node.style.transform = `translate(${x}px, ${y}px)`;
    }
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return ref;
}

export function Hero() {
  const parallaxRef = useHeroParallax();

  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-subtitle">Hello, I&apos;m</p>
          <h1 className="hero-title">{profile.name}</h1>
          <h2 className="hero-profession">{profile.title}</h2>
          <p className="hero-description">
            Passionate Full Stack Developer specializing in building modern, scalable, responsive, and
            user-friendly web applications that deliver exceptional user experiences and robust backend
            performance.
          </p>

          <div className="hero-buttons">
            <Button href="#projects" variant="primary">
              View My Work
            </Button>
            <Button href="#contact" variant="secondary">
              Hire Me
            </Button>
          </div>

          <div className="hero-socials">
            {socialLinks.map((social) => (
              <a href={social.href} key={social.name} aria-label={social.name}>
                <Icon name={social.icon} />
              </a>
            ))}
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Icon name="envelope" />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper" ref={parallaxRef}>
            <div className="profile-placeholder">
              <Icon name="user" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
