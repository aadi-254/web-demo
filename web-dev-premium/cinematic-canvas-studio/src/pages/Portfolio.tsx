import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

gsap.registerPlugin(ScrollTrigger);

// Replace images/videos here - Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: 'Aurora Brand Film',
    category: 'Commercial',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
    description: 'A cinematic brand film showcasing Aurora\'s innovative approach to sustainable energy.',
  },
  {
    id: 2,
    title: 'Velocity Documentary',
    category: 'Documentary',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
    description: 'An in-depth documentary exploring the world of professional motorsports.',
  },
  {
    id: 3,
    title: 'Neon Dreams',
    category: 'Music Video',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
    description: 'A visually stunning music video blending neon aesthetics with urban landscapes.',
  },
  {
    id: 4,
    title: 'Tech Summit 2024',
    category: 'Event',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
    description: 'Complete event coverage for the annual technology innovation summit.',
  },
  {
    id: 5,
    title: 'Ethereal Fashion',
    category: 'Fashion',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    description: 'A haute couture fashion film featuring ethereal styling and avant-garde design.',
  },
  {
    id: 6,
    title: 'Skyline Architecture',
    category: 'Brand Film',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
    description: 'Architectural storytelling showcasing modern urban development.',
  },
  {
    id: 7,
    title: 'Midnight Sessions',
    category: 'Music Video',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    description: 'An intimate music video capturing the essence of late-night creativity.',
  },
  {
    id: 8,
    title: 'Oceanic Research',
    category: 'Documentary',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&h=600&fit=crop',
    description: 'Deep-sea exploration documentary highlighting marine conservation efforts.',
  },
  {
    id: 9,
    title: 'Quantum Launch',
    category: 'Commercial',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    description: 'Product launch campaign for cutting-edge quantum computing technology.',
  },
];

const categories = ['All', 'Commercial', 'Documentary', 'Music Video', 'Event', 'Fashion', 'Brand Film'];

const Portfolio = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.portfolio-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // Grid items animation
      gsap.from('.portfolio-grid-item', {
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <MainLayout>
      <div ref={pageRef}>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="portfolio-hero-content text-cinema-gold text-sm tracking-[0.3em] uppercase font-body mb-4">
                Our Work
              </p>
              <h1 className="portfolio-hero-content text-5xl md:text-7xl lg:text-8xl font-display tracking-wider text-foreground mb-6">
                PORTFOLIO
              </h1>
              <p className="portfolio-hero-content text-muted-foreground font-body text-lg max-w-2xl leading-relaxed">
                A curated collection of our finest work, spanning commercials, documentaries, 
                music videos, and brand films. Each project represents our commitment to 
                cinematic excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-y border-border/30 bg-cinema-charcoal/50 sticky top-[73px] z-40 backdrop-blur-lg">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <Filter size={18} className="text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? 'hero' : 'cinema-ghost'}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className="flex-shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="portfolio-grid-item portfolio-item aspect-[4/3] rounded-sm group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/90 via-cinema-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-cinema-gold text-xs tracking-[0.2em] uppercase font-body mb-2">
                        {item.category} · {item.year}
                      </p>
                      <h3 className="text-xl font-display tracking-wider text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-body line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-cinema-gold flex items-center justify-center bg-cinema-dark/50 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Play size={24} className="text-cinema-gold ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-5xl bg-cinema-dark border-border p-0 overflow-hidden">
            <DialogTitle className="sr-only">{selectedItem?.title}</DialogTitle>
            <div className="relative aspect-video bg-cinema-charcoal">
              {/* Replace video placeholder here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-cinema-gold flex items-center justify-center mx-auto mb-4">
                    <Play size={40} className="text-cinema-gold ml-1" />
                  </div>
                  <p className="text-muted-foreground text-sm font-body">
                    Video placeholder - Replace with actual video
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cinema-dark/80 flex items-center justify-center text-foreground hover:text-cinema-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {selectedItem && (
              <div className="p-8">
                <p className="text-cinema-gold text-xs tracking-[0.2em] uppercase font-body mb-2">
                  {selectedItem.category} · {selectedItem.year}
                </p>
                <h3 className="text-3xl font-display tracking-wider text-foreground mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Portfolio;
