import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

// Replace images/videos here - Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: 'Aurora Brand Film',
    category: 'Commercial',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Velocity Documentary',
    category: 'Documentary',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Neon Dreams',
    category: 'Music Video',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Tech Summit 2024',
    category: 'Event',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Ethereal Fashion',
    category: 'Fashion',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Skyline Architecture',
    category: 'Brand Film',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
  },
];

const FeaturedWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Portfolio items animation
      const items = sectionRef.current?.querySelectorAll('.portfolio-item');
      if (items) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: items[0],
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-background">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(38_20%_8%/0.2)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-cinema-gold text-sm tracking-[0.3em] uppercase font-body mb-4">
              Selected Projects
            </p>
            <h2 className="text-4xl md:text-6xl font-display tracking-wider text-foreground">
              FEATURED <span className="text-gradient-gold">WORK</span>
            </h2>
          </div>
          <a
            href="/portfolio"
            className="mt-6 md:mt-0 text-muted-foreground hover:text-cinema-gold transition-colors text-sm tracking-[0.2em] uppercase font-body flex items-center gap-2 group"
          >
            View All Projects
            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-item aspect-[4/3] rounded-sm group"
              onClick={() => setSelectedItem(item)}
            >
              {/* Thumbnail - Replace image here */}
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
                  <h3 className="text-xl font-display tracking-wider text-foreground">
                    {item.title}
                  </h3>
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

      {/* Video Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl bg-cinema-dark border-border p-0 overflow-hidden">
          <DialogTitle className="sr-only">{selectedItem?.title}</DialogTitle>
          <div className="relative aspect-video bg-cinema-charcoal">
            {/* Replace video placeholder here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-cinema-gold flex items-center justify-center mx-auto mb-4">
                  <Play size={32} className="text-cinema-gold ml-1" />
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
            <div className="p-6">
              <p className="text-cinema-gold text-xs tracking-[0.2em] uppercase font-body mb-2">
                {selectedItem.category} · {selectedItem.year}
              </p>
              <h3 className="text-2xl font-display tracking-wider text-foreground">
                {selectedItem.title}
              </h3>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedWorkSection;
