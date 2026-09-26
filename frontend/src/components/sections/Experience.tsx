import { experience } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <SectionHeader subtitle="Career Journey" title="Professional Experience" />

        <div className="timeline">
          {experience.map((item, index) => (
            <Reveal
              as="article"
              variant={index % 2 === 0 ? 'left' : 'right'}
              className="timeline-item"
              key={item.role}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.role}</h3>
                <h4>{item.org}</h4>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
