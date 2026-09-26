import { profile } from '../../data/portfolio';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Icon } from '../../components/ui/icons';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <SectionHeader subtitle="Get In Touch" title="Contact Me" />

        <div className="contact-container">
          <div className="contact-info">
            <h3>Let&apos;s Build Something Amazing</h3>
            <p>
              I&apos;m always interested in discussing new opportunities, freelance projects, or
              collaborations.
            </p>

            <div className="contact-item">
              <Icon name="envelope" />
              <span>{profile.email}</span>
            </div>
            <div className="contact-item">
              <Icon name="phone" />
              <span>{profile.phone}</span>
            </div>
            <div className="contact-item">
              <Icon name="location" />
              <span>{profile.location}</span>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
