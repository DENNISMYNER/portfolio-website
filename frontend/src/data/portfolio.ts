/**
 * All portfolio content in one place, carried over verbatim from the original
 * index.html. Editing your name, projects, or copy only ever means editing
 * this file — no component needs to change.
 */

export const profile = {
  name: 'Dennis Maina',
  logoInitial: 'D.',
  title: 'Full Stack Developer',
  email: 'dennowmyner04@gmail.com',
  phone: '+254 790 399 941',
  location: 'Nairobi, Kenya',
  availability: 'Open to Opportunities',
};

export const socialLinks = [
  { name: 'GitHub', href: '#', icon: 'github' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'X (Twitter)', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
] as const;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;

export const aboutDetails = [
  { icon: 'user', label: 'Name', value: profile.name },
  { icon: 'envelope', label: 'Email', value: profile.email },
  { icon: 'location', label: 'Location', value: profile.location },
  { icon: 'briefcase', label: 'Availability', value: profile.availability },
] as const;

export const skillCategories = [
  {
    icon: 'display',
    title: 'Frontend Development',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    icon: 'server',
    title: 'Backend Development',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'JWT', 'API Integration'],
  },
  {
    icon: 'database',
    title: 'Databases',
    items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    icon: 'tools',
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Netlify', 'Vercel'],
  },
] as const;

export const skillProgress = [
  { label: 'HTML', percent: 95 },
  { label: 'CSS', percent: 92 },
  { label: 'JavaScript', percent: 88 },
  { label: 'Node.js', percent: 85 },
] as const;

export const services = [
  {
    icon: 'code',
    title: 'Frontend Development',
    description:
      'Creating responsive, interactive, and visually appealing user interfaces using modern web technologies.',
  },
  {
    icon: 'layers',
    title: 'Full Stack Development',
    description:
      'Building complete web applications from frontend interfaces to backend architecture and databases.',
  },
  {
    icon: 'mobile',
    title: 'Responsive Design',
    description: 'Ensuring websites look and perform beautifully across desktops, tablets, and smartphones.',
  },
  {
    icon: 'database',
    title: 'Database Design',
    description: 'Structuring secure and scalable databases for modern web applications.',
  },
  {
    icon: 'cloud',
    title: 'Deployment',
    description: 'Deploying production-ready applications using modern cloud hosting platforms.',
  },
  {
    icon: 'headset',
    title: 'Maintenance & Support',
    description: 'Providing continuous improvements, bug fixes, updates, and performance optimization.',
  },
] as const;

export const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A complete online shopping platform with authentication, payment integration, inventory management, and admin dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    demoHref: '#',
    codeHref: '#',
  },
  {
    title: 'Project Management App',
    description:
      'A collaborative productivity platform with task assignment, authentication, team collaboration, and analytics dashboard.',
    tech: ['React', 'Node', 'MongoDB', 'Express'],
    demoHref: '#',
    codeHref: '#',
  },
  {
    title: 'Business Portfolio',
    description:
      'A high-performance corporate website featuring SEO optimization, responsive layouts, animations, and contact forms.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoHref: '#',
    codeHref: '#',
  },
] as const;

export const experience = [
  {
    date: '2024 - Present',
    role: 'Remote Full Stack Developer',
    org: 'Building Scalable & Modern Web Applications',
    description:
      'I work on the development of enterprise web applications, optimize system performance, and collaborate with multidisciplinary teams to deliver scalable software solutions.',
  },
  {
    date: '2022 - 2024',
    role: 'Frontend Developer',
    org: 'Creative Digital Agency',
    description:
      'Built responsive websites, improved user experiences, collaborated with designers, and maintained high-performance frontend applications.',
  },
] as const;

export const education = [
  {
    year: '2017 - 2021',
    degree: 'Bachelor of Information Technology',
    school: 'Dedan Kimathi University of Technology',
    description:
      'Specialized in Software Engineering, Web Development, Database Systems, Networking, and Human Computer Interaction.',
  },
] as const;

export const certifications = [
  { title: 'Meta Front-End Developer', issuer: 'Coursera' },
  { title: 'Google UX Design', issuer: 'Google' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp' },
] as const;

export const techStack = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'Git',
  'GitHub',
  'VS Code',
  'Figma',
] as const;

export const stats = [
  { value: 30, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
] as const;

export const testimonials = [
  {
    quote:
      'Dennis consistently delivered exceptional work, communicated professionally, and exceeded our expectations on every milestone.',
    name: 'Sarah Johnson',
    role: 'Project Manager',
  },
  {
    quote:
      'Highly skilled, reliable, and incredibly easy to work with. I would gladly recommend him for any web development project.',
    name: 'Michael Brown',
    role: 'Startup Founder',
  },
] as const;
