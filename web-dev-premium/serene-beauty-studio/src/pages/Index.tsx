import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServicesPreview from '@/components/ServicesPreview';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div className="relative overflow-x-hidden">
      {/* Subtle grain texture overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesPreview />
        <AboutSection />
        <GallerySection />
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
