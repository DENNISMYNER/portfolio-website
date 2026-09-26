import { projects } from '../../data/portfolio';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../ui/icons';

export function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <SectionHeader subtitle="Portfolio" title="Featured Projects" />

        <div className="projects-grid">
          {projects.map((project) => (
            <Reveal as="article" variant="scale" className="project-card" key={project.title}>
              <div className="project-image">
                <div className="project-placeholder">
                  <Icon name="image" />
                </div>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <Button href={project.demoHref} variant="primary">
                    Live Demo
                  </Button>
                  <Button href={project.codeHref} variant="secondary">
                    GitHub
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
