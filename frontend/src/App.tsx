import { About } from './components/sections/About';
import { Certifications } from './components/sections/Certifications';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Stats } from './components/sections/Stats';
import { TechStack } from './components/sections/TechStack';
import { Testimonials } from './components/sections/Testimonials';
import { BackToTop } from './components/layout/BackToTop';
import { FloatingBackground } from './components/layout/FloatingBackground';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { PageLoader } from './components/layout/PageLoader';
import { ContactSection } from './features/contact/ContactSection';

export default function App() {
  return (
    <>
      <PageLoader />
      <FloatingBackground />
      <BackToTop />
      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <TechStack />
        <Stats />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
