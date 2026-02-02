import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/ui/ProductCard';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import product images - Replace these with your product images
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';

/**
 * FeaturedSection Component
 * Horizontal scroll section showcasing featured products
 */
const FeaturedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Sample products - Replace with your product data
  const products = [
    {
      id: '1',
      name: 'Cashmere Knit',
      price: 890,
      image: product1,
      category: 'Knitwear',
    },
    {
      id: '2',
      name: 'Tailored Blazer',
      price: 1250,
      image: product2,
      category: 'Outerwear',
    },
    {
      id: '3',
      name: 'Silk Blouse',
      price: 650,
      image: product3,
      category: 'Tops',
    },
    {
      id: '4',
      name: 'Heritage Watch',
      price: 2400,
      image: product4,
      category: 'Accessories',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const title = titleRef.current;

    if (!section || !wrapper || !title) return;

    // Title reveal animation
    gsap.from(title.querySelectorAll('.reveal-item'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      },
    });

    // Horizontal scroll animation
    const items = wrapper.querySelectorAll('.horizontal-item');
    const totalWidth = Array.from(items).reduce(
      (acc, item) => acc + (item as HTMLElement).offsetWidth + 32, // 32px gap
      0
    );

    gsap.to(wrapper, {
      x: () => -(totalWidth - window.innerWidth + 100),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleQuickView = (id: string) => {
    console.log('Quick view product:', id);
    // Implement quick view modal here
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Section Title */}
      <div
        ref={titleRef}
        className="section-padding pt-24 pb-12"
      >
        <p className="reveal-item text-editorial text-muted-foreground mb-4">
          Curated Selection
        </p>
        <h2 className="reveal-item heading-editorial text-4xl md:text-6xl text-foreground">
          Featured Pieces
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={wrapperRef}
        className="flex gap-8 pl-6 md:pl-12 lg:pl-24"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="horizontal-item w-[300px] md:w-[400px] flex-shrink-0"
          >
            <ProductCard
              {...product}
              onQuickView={handleQuickView}
            />
          </div>
        ))}

        {/* End Spacer with CTA */}
        <div className="horizontal-item w-[300px] md:w-[400px] flex-shrink-0 flex items-center justify-center">
          <a
            href="/collections"
            className="heading-editorial text-3xl md:text-4xl text-muted-foreground hover:text-foreground transition-colors gold-underline"
          >
            View All →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
