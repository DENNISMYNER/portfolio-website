import { education } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

export function Education() {
  return (
    <section className="education section" id="education">
      <div className="container">
        <SectionHeader subtitle="Academic Background" title="Education" />

        <div className="education-grid">
          {education.map((item) => (
            <Reveal as="article" className="education-card" key={item.degree}>
              <div className="education-icon">
                <Icon name="graduationCap" />
              </div>
              <span className="education-year">{item.year}</span>
              <h3>{item.degree}</h3>
              <h4>{item.school}</h4>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
