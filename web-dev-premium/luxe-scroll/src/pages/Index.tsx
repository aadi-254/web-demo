import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedSection from '@/components/sections/FeaturedSection';
import LookbookSection from '@/components/sections/LookbookSection';
import AboutSection from '@/components/sections/AboutSection';
import NewsletterSection from '@/components/sections/NewsletterSection';

/**
 * Home Page
 * Main landing page with hero, featured products, lookbook, and more
 */
const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products - Horizontal Scroll */}
      <FeaturedSection />

      {/* Lookbook Gallery */}
      <LookbookSection />

      {/* Brand Story */}
      <AboutSection />

      {/* Newsletter */}
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
