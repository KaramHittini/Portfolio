import './index.css';
import CustomCursor from './components/cursor/CustomCursor';
import ScrollProgress from './components/shared/ScrollProgress';
import Navbar from './components/nav/Navbar';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import ProjectsSection from './components/projects/ProjectsSection';
import TechStackSection from './components/tech/TechStackSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/shared/Footer';

export default function App() {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Hero — handles its own positioning during intro */}
      <HeroSection />

      {/* Main content */}
      <main>
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
