import { profile, socialLinks } from '../../data/portfolio';
import { useCopyrightYear } from '../../hooks/useCopyrightYear';
import { Icon } from '../ui/icons';

export function Footer() {
  const year = useCopyrightYear();

  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer-logo">{profile.name}</h2>
        <p>
          Full Stack Developer dedicated to crafting beautiful, scalable, and high-performing digital
          experiences.
        </p>

        <div className="footer-socials">
          {socialLinks.map((social) => (
            <a href={social.href} key={social.name} aria-label={social.name}>
              <Icon name={social.icon} />
            </a>
          ))}
        </div>

        <p className="copyright">
          © {year} {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
