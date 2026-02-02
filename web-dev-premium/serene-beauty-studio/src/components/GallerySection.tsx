import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: gallery1, alt: 'Luxury salon interior' },
  { id: 2, src: gallery2, alt: 'Professional hair styling tools' },
  { id: 3, src: gallery3, alt: 'Premium beauty products' },
  { id: 4, src: gallery4, alt: 'Spa lounge area' },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
        },
      });

      // Grid items animation
      const items = gridRef.current?.children;
      if (items) {
        gsap.set(items, { opacity: 0, y: 40, scale: 0.95 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-luxury bg-ivory">
      <div className="container-luxury">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-eyebrow mb-4 block">Our Gallery</span>
          <h2 className="text-headline text-charcoal mb-6">
            A Glimpse of <em className="text-gold">Elegance</em>
          </h2>
          <div className="divider-gold-lg" />
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full"
              />
              <div className="gallery-item-overlay">
                <div className="w-12 h-12 rounded-full border border-ivory/50 flex items-center justify-center">
                  <span className="text-ivory text-2xl font-light">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
