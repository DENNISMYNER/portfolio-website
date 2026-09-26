import type { IconType } from 'react-icons';
import {
  FaArrowUp,
  FaAward,
  FaBriefcase,
  FaCloud,
  FaCode,
  FaDatabase,
  FaDisplay,
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaHeadset,
  FaImage,
  FaInstagram,
  FaLayerGroup,
  FaLinkedinIn,
  FaLocationDot,
  FaMobileScreenButton,
  FaPhone,
  FaScrewdriverWrench,
  FaServer,
  FaUser,
  FaXTwitter,
} from 'react-icons/fa6';

/** Maps the icon names used in data/portfolio.ts to their react-icons component. */
export const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  envelope: FaEnvelope,
  arrowUp: FaArrowUp,
  user: FaUser,
  code: FaCode,
  display: FaDisplay,
  server: FaServer,
  database: FaDatabase,
  tools: FaScrewdriverWrench,
  layers: FaLayerGroup,
  mobile: FaMobileScreenButton,
  cloud: FaCloud,
  headset: FaHeadset,
  image: FaImage,
  location: FaLocationDot,
  briefcase: FaBriefcase,
  phone: FaPhone,
  graduationCap: FaGraduationCap,
  award: FaAward,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: IconName } & React.ComponentProps<IconType>) {
  const Component = ICONS[name];
  return <Component {...props} />;
}
