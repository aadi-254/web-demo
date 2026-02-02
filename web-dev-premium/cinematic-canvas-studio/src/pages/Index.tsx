import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <StatsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
