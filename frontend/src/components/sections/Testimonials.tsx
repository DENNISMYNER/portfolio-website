import { testimonials } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <SectionHeader subtitle="Testimonials" title="What Clients Say" />

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <Reveal as="article" variant="scale" className="testimonial-card" key={testimonial.name}>
              <p>&quot;{testimonial.quote}&quot;</p>
              <h4>{testimonial.name}</h4>
              <span>{testimonial.role}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
