import './index.css';
import ScrollProgress from './components/shared/ScrollProgress';
import Navbar from './components/nav/Navbar';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import ProjectsSection from './components/projects/ProjectsSection';
import TechStackSection from './components/tech/TechStackSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/shared/Footer';
import SocialSidebar from './components/shared/SocialSidebar';
import ClickSpark from './components/shared/ClickSpark';
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  return (
    <>
      <Analytics/>
      <ClickSpark sparkColor="var(--accent)" sparkCount={8} sparkRadius={22} sparkSize={11}>
        <div style={{ backgroundColor: 'var(--bg-base)', minHeight: '100vh' }}>
          {/* Global overlays */}
          <ScrollProgress />

          {/* Fixed social sidebar — bottom left */}
          <SocialSidebar />

          {/* Navigation — hamburger top right */}
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
      </ClickSpark>
    </>
  );
}
