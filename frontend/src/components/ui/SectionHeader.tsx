import { Reveal } from './Reveal';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
}

/** The centered "subtitle / title / description" block that opens every section. */
export function SectionHeader({ subtitle, title, description }: SectionHeaderProps) {
  return (
    <Reveal className="section-header">
      <span className="section-subtitle">{subtitle}</span>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
