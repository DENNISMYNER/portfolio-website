import { useEffect, useRef, useState } from 'react';
import { skillCategories, skillProgress } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

/** Animates each progress bar's width from 0 to its target once scrolled into view. */
function ProgressBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="progress-item" ref={ref}>
      <div className="progress-info">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: animated ? `${percent}%` : '0%', transition: 'width 1.2s ease' }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeader
          subtitle="Technical Expertise"
          title="Skills & Technologies"
          description="My technical toolkit spans the entire web development lifecycle, enabling me to design, develop, deploy, and maintain modern, scalable applications."
        />

        <div className="skills-grid">
          {skillCategories.map((category) => (
            <Reveal as="article" className="skill-card" key={category.title}>
              <div className="skill-icon">
                <Icon name={category.icon} />
              </div>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="skill-progress">
          {skillProgress.map((skill) => (
            <ProgressBar key={skill.label} label={skill.label} percent={skill.percent} />
          ))}
        </div>
      </div>
    </section>
  );
}
