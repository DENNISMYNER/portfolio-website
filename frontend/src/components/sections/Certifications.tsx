import { certifications } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

export function Certifications() {
  return (
    <section className="certifications section">
      <div className="container">
        <SectionHeader subtitle="Professional Growth" title="Certifications" />

        <div className="certification-grid">
          {certifications.map((cert) => (
            <Reveal variant="scale" className="certificate-card" key={cert.title}>
              <Icon name="award" />
              <h3>{cert.title}</h3>
              <p>{cert.issuer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
