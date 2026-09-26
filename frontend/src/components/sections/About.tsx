import { aboutDetails } from '../../data/portfolio';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

export function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeader
          subtitle="Get To Know Me"
          title="About Me"
          description="I am a passionate Full Stack Developer dedicated to creating fast, accessible, and visually engaging web applications. My journey in software development has been driven by curiosity, continuous learning, and a commitment to writing clean, maintainable code."
        />

        <div className="about-content">
          <Reveal variant="left" className="about-image">
            <div className="about-placeholder">
              <Icon name="code" />
            </div>
          </Reveal>

          <Reveal variant="right" as="div" className="about-text">
            <h3>Turning Ideas Into Exceptional Digital Experiences</h3>
            <p>
              Over the years, I have worked on numerous personal, freelance, and collaborative projects
              ranging from business websites to complete web applications.
            </p>
            <p>
              My approach combines modern frontend design, efficient backend architecture, and database
              optimization to deliver secure, scalable, and high-performing solutions.
            </p>
            <p>
              Beyond coding, I enjoy exploring emerging technologies, contributing to open-source communities,
              and continuously improving my craft through hands-on projects.
            </p>

            <div className="about-details">
              {aboutDetails.map((detail) => (
                <div className="detail-card" key={detail.label}>
                  <Icon name={detail.icon} />
                  <div>
                    <h4>{detail.label}</h4>
                    <p>{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
