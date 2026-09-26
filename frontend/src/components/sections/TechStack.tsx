import { techStack } from '../../data/portfolio';
import { SectionHeader } from '../ui/SectionHeader';

export function TechStack() {
  return (
    <section className="tech-stack section">
      <div className="container">
        <SectionHeader subtitle="Daily Toolkit" title="Technologies I Use" />

        <div className="tech-grid">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
