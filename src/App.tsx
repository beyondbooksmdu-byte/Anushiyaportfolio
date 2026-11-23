import {useState} from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import LightboxModal from './components/LightboxModal';
import LiveProjectModal from './components/LiveProjectModal';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import ResearchSection from './components/ResearchSection';
import SeoSection from './components/SeoSection';
import SitemapSection from './components/SitemapSection';
import UspSection from './components/UspSection';
import WireframeSection from './components/WireframeSection';
import {LightboxData} from './types/portfolio';

export default function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxData | null>(null);
  const [liveProjectOpen, setLiveProjectOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#252525]">
      <Navbar />

      <main>
        <HeroSection onExpandImage={setLightboxItem} />
        <AboutSection onExpandImage={setLightboxItem} />
        <ProjectsSection
          onExpandImage={setLightboxItem}
          onOpenLiveProject={() => setLiveProjectOpen(true)}
        />
        <ResearchSection onExpandImage={setLightboxItem} />
        <UspSection onExpandImage={setLightboxItem} />
        <SitemapSection onExpandImage={setLightboxItem} />
        <WireframeSection onExpandImage={setLightboxItem} />
        <SeoSection onExpandImage={setLightboxItem} />
        <ContactSection />
      </main>

      <Footer />

      <LightboxModal
        data={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
      <LiveProjectModal
        open={liveProjectOpen}
        onClose={() => setLiveProjectOpen(false)}
      />
    </div>
  );
}
