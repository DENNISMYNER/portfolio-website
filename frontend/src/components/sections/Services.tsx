import { services } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

export function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <SectionHeader subtitle="What I Offer" title="Professional Services" />

        <div className="services-grid">
          {services.map((service) => (
            <Reveal as="article" variant="scale" className="service-card" key={service.title}>
              <Icon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
